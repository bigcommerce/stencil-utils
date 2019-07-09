import ImageTool from './tools/image';
import ImageSrcsetTool from './tools/imageSrcset';
import StorageTools from './tools/storage';

export default {
    image: new ImageTool(),
    imageSrcset: new ImageSrcsetTool(),
    storage: new StorageTools(),
};
