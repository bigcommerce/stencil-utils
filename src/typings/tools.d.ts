export declare namespace Tools {
    class ImageTool {
        getSrc(path: string, dimensions: string): string;
    }

    class StorageTools {
        /**
         * Check if a storage type (like localStorage or sessionStorage) is available for use
         * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
         * @param type
         * @returns boolean
         */
        storageAvailable(type: string): boolean;
        localStorageAvailable(): boolean;
    }
}

export interface Tools {
    image: Tools.ImageTool;
    storage: Tools.StorageTools;
}

export default Tools;
