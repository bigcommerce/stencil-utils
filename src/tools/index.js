import ImageTool from './image';
import ImageSrcsetTool from './imageSrcset';
import StorageTools from './storage';

const tools = {
    image: new ImageTool(),
    imageSrcset: new ImageSrcsetTool(),
    storage: new StorageTools(),
};

export default tools;
