export default class {
    getSrc(path, dimensions) {
        let size;

        if (typeof(dimensions) === 'object') {
            const width = dimensions.width || 100;
            const height = dimensions.height || 100;

            size = `${width}x${height}`;
        } else {
            size = 'original';
        }

        return path.replace('{:size}', size);
    }
}
