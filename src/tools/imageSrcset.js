export default class {
    getSrcset(url, sizes) {
        // Regex to test size string is of the form 123x123 or 100w
        const sizeRegex = /(^\d+w$)|(^(\d+?)x(\d+?)$)/;
        // Regex to test to that srcset descriptor is of the form 1x 1.5x 2x OR 123w
        const descriptorRegex = /(^\d+w$)|(^([0-9](\.[0-9]+)?)x)$/;

        let srcsets = {};

        if (!sizes) {
            // Use default srcsets if none are provided
            srcsets = {
                '80w': '80w',
                '160w': '160w',
                '320w': '320w',
                '640w': '640w',
                '960w': '960w',
                '1280w': '1280w',
                '1920w': '1920w',
                '2560w': '2560w',
            };
        } else if ((sizes === Object(sizes)) && !Object.keys(sizes).some((descriptor) => !(descriptorRegex.test(descriptor) && sizeRegex.test(sizes[descriptor])))) {
            // If object consists of valid srcsets, use it instead
            srcsets = sizes;
            // If there's only one argument, return a `src` only (also works for `srcset`)
            if (Object.keys(srcsets).length === 1) {
                return (url.replace('{:size}', srcsets[Object.keys(srcsets)[0]]));
            }
        } else {
            throw new Error('Invalid srcset descriptor or size');
        }

        // eslint-disable-next-line new-cap
        return Object.keys(srcsets).map((descriptor) => [url.replace('{:size}', srcsets[descriptor]), descriptor].join(' ')).join(', ');
    }
}
