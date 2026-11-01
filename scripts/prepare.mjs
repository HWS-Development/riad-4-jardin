import { syncContent } from './content.mjs';
import { optimizeImages } from './images.mjs';
await optimizeImages(await syncContent());
