export default class {
    getSrc(path, dimensions) {
        const sizeRegex = /^(\d+?)x(\d+?)$/g;
        let size;

        if (typeof(dimensions) === 'object') {
            const width = dimensions.width || 100;
            const height = dimensions.height || 100;

            size = `${width}x${height}`;
        } else if (typeof(dimensions) === 'string' && sizeRegex.test(dimensions)) {
            // If dimensions is a string and match the NNNxNNN format
            size = dimensions;
        } else {
            // Use the original image size
            size = 'original';
        }

        return path.replace('{:size}', size);
    }
}
