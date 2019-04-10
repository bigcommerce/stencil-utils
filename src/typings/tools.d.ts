export declare namespace Tools {
    class ImageTool {
        getSrc(path: string, dimensions: string): string;
    }

    class StorageTools {
        storageAvailable(type: string): boolean;
        localStorageAvailable(): boolean;
    }
}

export interface Tools {
    image: Tools.ImageTool;
    storage: Tools.StorageTools;
}

export default Tools;
