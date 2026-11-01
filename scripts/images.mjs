import { readdir, mkdir, readFile, writeFile, rm, copyFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { generated } from './content.mjs';

const root = new URL('../', import.meta.url);
export async function optimizeImages(snapshot) {
  const sourceCache = new URL('.cache/sanity-images/', root);
  const outputCache = new URL('.cache/encoded-images/', root);
  await mkdir(sourceCache, { recursive: true });
  await mkdir(outputCache, { recursive: true });
  async function encode(name, generate) {
    const cached = new URL(name, outputCache);
    const output = new URL(`public/media/${name}`, root);
    try { await copyFile(cached, output); return; }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    const temp = new URL(`${name}.${process.pid}.tmp`, outputCache);
    await generate(fileURLToPath(temp));
    await rename(temp, cached);
    await copyFile(cached, output);
  }
  await rm(new URL('public/media/', root), { recursive: true, force: true });
  const images = [];
  async function scan(url, prefix = '') {
    for (const entry of await readdir(url, { withFileTypes: true })) {
      if (entry.isDirectory()) await scan(new URL(`${entry.name}/`, url), `${prefix}${entry.name}/`);
      else if (/\.(jpg|jpeg|png)$/i.test(entry.name) && entry.name !== 'logo-full.png') images.push({ key: `${prefix}${entry.name}`, input: await readFile(new URL(entry.name, url)) });
    }
  }
  await scan(new URL('src/assets/', root));
  images.push({ key: 'logo-full.png', input: await readFile(new URL('src/assets/logo-full.png', root)) });
  for (const name of ['hero.jpg', 'hero-cover2.png', 'hero-cover3.png']) images.push({ key: `hero/${name}`, input: await readFile(new URL(`public/images/${name}`, root)) });
  const downloads = new Map();
  for (const locale of Object.values(snapshot.locales)) for (const image of Object.values(locale.images)) {
    if (downloads.has(image.url)) {
      images.push({ key: image.src, input: downloads.get(image.url), crop: image.crop, slot: image.slot });
      continue;
    }
    // Sanity original asset URLs are content-addressed. Cache their public bytes
    // atomically; an interrupted build can never promote a partial cache file.
    const cacheName = `${createHash('sha256').update(image.url).digest('hex')}.image`;
    const cached = new URL(cacheName, sourceCache);
    let input;
    try { input = await readFile(cached); }
    catch (error) {
      if (error.code !== 'ENOENT') throw error;
      const response = await fetch(image.url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`Unable to fetch CMS image ${image.src}`);
      if (Number(response.headers.get('content-length')) > 25000000) throw new Error('CMS image exceeds 25 MB');
      input = Buffer.from(await response.arrayBuffer());
      if (input.length > 25000000) throw new Error('CMS image exceeds 25 MB');
      const temporary = new URL(`${cacheName}.${process.pid}.tmp`, sourceCache);
      await writeFile(temporary, input);
      await rename(temporary, cached);
    }
    if (input.length > 25000000) throw new Error('CMS image exceeds 25 MB');
    downloads.set(image.url, input);
    images.push({ key: image.src, input, crop: image.crop, slot: image.slot });
  }
  const manifest = {};
  const encoded = new Map();
  await mkdir(new URL('public/media/', root), { recursive: true });
  for (const { key, input, crop: originalCrop, slot } of images) {
    const crop = originalCrop && Object.values(originalCrop).some(Boolean) ? originalCrop : undefined;
    const isLogo = (slot || key) === 'logo-full.png';
    const quality = isLogo ? 90 : 76;
    const avifEnabled = (slot || key).startsWith('gallery/') || ['hero/hero.jpg', 'hero/hero-cover2.png', 'hero/hero-cover3.png', 'rooms/deluxe/main.jpg', 'spa/hero.jpg', 'restaurant/hero.jpg', 'home/garden.jpg', 'services/workshops.jpg'].includes(slot || key);
    const avifQuality = (slot || key).startsWith('hero/') ? 40 : 50;
    const hash = createHash('sha256').update(input).update(JSON.stringify({ crop, quality, avifQuality, pipeline: 'webp-avif-e5-v3' })).digest('hex').slice(0, 12);
    const cacheKey = `${hash}:${avifEnabled}:${(slot || key).startsWith('hero/')}`;
    if (encoded.has(cacheKey)) { manifest[key] = encoded.get(cacheKey); continue; }
    const rotated = await sharp(input).rotate().toBuffer();
    const original = await sharp(rotated).metadata();
    let pipeline = sharp(rotated);
    let width = original.width, height = original.height;
    if (crop && Object.values(crop).some(Boolean)) {
      const left = Math.round(crop.left * width), top = Math.round(crop.top * height);
      width -= left + Math.round(crop.right * width); height -= top + Math.round(crop.bottom * height);
      if (width < 1 || height < 1) throw new Error(`Invalid crop ${key}`);
      pipeline = pipeline.extract({ left, top, width, height });
    }
    const widths = [...new Set([...(isLogo ? [80, 128, 160, 256] : [320, 480, 640, 768, 1024, 1440, 1920]), Math.min(width, 1920)].filter(size => size <= width))].sort((a,b) => a-b);
    if (!widths.length) widths.push(width);
    const variants = [];
    const avifs = [];
    for (const size of widths) {
      const name = `${hash}-${size}.webp`;
      await encode(name, output => pipeline.clone().resize({ width: size, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(output));
      variants.push({ src: `/media/${name}`, width: size });
      if (avifEnabled) {
        const name = `${hash}-${size}.avif`;
        await encode(name, output => pipeline.clone().resize({ width: size, withoutEnlargement: true }).avif({ quality: avifQuality, effort: 4 }).toFile(output));
        avifs.push({ src: `/media/${name}`, width: size });
      }
    }
    const preferred = variants.find(variant => variant.width >= 1024) || variants.at(-1);
    manifest[key] = { src: preferred.src, srcSet: variants.map(variant => `${variant.src} ${variant.width}w`).join(', '), width, height, variants };
    if (avifs.length) manifest[key].avif = { src: avifs.at(-1).src, srcSet: avifs.map(variant => `${variant.src} ${variant.width}w`).join(', '), variants: avifs };
    // A center-cropped portrait retains the existing object-cover framing on phones,
    // without transferring the invisible left/right parts of a landscape hero.
    if ((slot || key).startsWith('hero/')) {
      const maxWidth = Math.min(width, Math.floor(height * 5 / 8));
      const portraitWidths = [...new Set([320, 480, 640, Math.min(maxWidth, 768)].filter(size => size <= maxWidth))].sort((a,b) => a-b);
      const portraits = [];
      const portraitAvifs = [];
      for (const size of portraitWidths) {
        const name = `${hash}-portrait-${size}.webp`;
        await encode(name, output => pipeline.clone().resize({ width: size, height: Math.round(size * 8 / 5), fit: 'cover', position: 'centre', withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(output));
        portraits.push({ src: `/media/${name}`, width: size });
        if (avifEnabled) {
          const name = `${hash}-portrait-${size}.avif`;
          await encode(name, output => pipeline.clone().resize({ width: size, height: Math.round(size * 8 / 5), fit: 'cover', position: 'centre', withoutEnlargement: true }).avif({ quality: avifQuality, effort: 4 }).toFile(output));
          portraitAvifs.push({ src: `/media/${name}`, width: size });
        }
      }
      manifest[key].portrait = { src: portraits.at(-1).src, srcSet: portraits.map(variant => `${variant.src} ${variant.width}w`).join(', '), variants: portraits };
      if (portraitAvifs.length) manifest[key].portrait.avif = { src: portraitAvifs.at(-1).src, srcSet: portraitAvifs.map(variant => `${variant.src} ${variant.width}w`).join(', '), variants: portraitAvifs };
    }
    encoded.set(cacheKey, manifest[key]);
  }
  await mkdir(generated, { recursive: true });
  await writeFile(new URL('media.json', generated), JSON.stringify(manifest));
  const logo = sharp(fileURLToPath(new URL('src/assets/logo-full.png', root)));
  await logo.resize({ width: 64, height: 64, fit: 'contain' }).png().toFile(fileURLToPath(new URL('public/favicon.png', root)));
  await mkdir(new URL('public/licenses/', root), { recursive: true });
  for (const font of ['inter', 'playfair-display']) await copyFile(new URL(`node_modules/@fontsource-variable/${font}/LICENSE`, root), new URL(`public/licenses/${font}-OFL.txt`, root));
  console.log(`Images: ${Object.keys(manifest).length} originals; real WebP width variants generated.`);
  return manifest;
}
