import { useContent } from '../content/ContentContext.jsx';

export default function ResponsiveImage({ src, alt = '', sizes = '(min-width: 1152px) 552px, (min-width: 768px) 48vw, calc(100vw - 48px)', priority = false, loading, ...props }) {
  const { media = {}, images = {} } = useContent();
  const override = images[src];
  const image = media[override?.src || src];
  if (!image) throw new Error(`Missing optimized image: ${src}`);
  const element = <img {...props} src={image.src} srcSet={image.srcSet} sizes={sizes}
    width={image.width} height={image.height} alt={alt === '' ? '' : (override?.alt ?? alt)}
    loading={priority ? 'eager' : (loading || 'lazy')} decoding="async"
    fetchPriority={priority ? 'high' : undefined} />;
  if (!image.portrait && !image.avif) return element;
  return <picture className="contents">
    {image.portrait?.avif && <source media="(max-width: 767px)" srcSet={image.portrait.avif.srcSet} sizes="100vw" type="image/avif" />}
    {image.portrait && <source media="(max-width: 767px)" srcSet={image.portrait.srcSet} sizes="100vw" type="image/webp" />}
    {image.avif && <source srcSet={image.avif.srcSet} sizes={sizes} type="image/avif" />}
    {element}
  </picture>;
}
