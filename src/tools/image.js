import _ from 'lodash';

export default class {
    getSrc(path, dimensions) {
        return generateSrc(path, dimensions);
    }

    getTag(imgObj, dimensions, attrs) {
        let attrsStr,
            src = generateSrc(imgObj.data, dimensions);

        attrsStr = _.reduce(attrs, (acc, val, key) => {
            acc.push(`${key}="${val}"`);

            return acc;
        }, []).join(' ');

        return `<img src="${src}" alt="${imgObj.alt}" ${attrsStr}>`;
    }
}

function generateSrc(path, dimensions) {
    let size;

    if (_.isObject(dimensions)) {
        let width = dimensions.width || 100,
            height = dimensions.height || 100;

        size = `${width}x${height}`;
    } else {
        size = 'original';
    }

    return path.replace('{:size}', size);
}
