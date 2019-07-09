import tools from '../tools';

describe('tools.image', () => {
    it('should return a src if a valid image and size is passed (inherent width string)', () => {
        const expected = 'https://cdn.example.com/path/to/100w/image.png?c=2';
        const actual = tools.image.getSrc(
            'https://cdn.example.com/path/to/{:size}/image.png?c=2',
            '100w'
        );

        expect(actual).toEqual(expected);
    });

    it('should return a src if a valid image and size is passed (pixel size string)', () => {
        const expected = 'https://cdn.example.com/path/to/100x100/image.png?c=2';
        const actual = tools.image.getSrc(
            'https://cdn.example.com/path/to/{:size}/image.png?c=2',
            '100x100'
        );

        expect(actual).toEqual(expected);
    });

    it('should return a src if a valid image and size is passed (pixel size object)', () => {
        const expected = 'https://cdn.example.com/path/to/123x123/image.png?c=2';
        const actual = tools.image.getSrc(
            'https://cdn.example.com/path/to/{:size}/image.png?c=2',
            { width: 123, height: 123 }
        );

        expect(actual).toEqual(expected);
    });

    it('should return a src 100px wide if width is missing (pixel size object)', () => {
        const expected = 'https://cdn.example.com/path/to/100x123/image.png?c=2';
        const actual = tools.image.getSrc(
            'https://cdn.example.com/path/to/{:size}/image.png?c=2',
            { height: 123 }
        );

        expect(actual).toEqual(expected);
    });

    it('should return a src 100px high if height is missing (pixel size object)', () => {
        const expected = 'https://cdn.example.com/path/to/123x100/image.png?c=2';
        const actual = tools.image.getSrc(
            'https://cdn.example.com/path/to/{:size}/image.png?c=2',
            { width: 123 }
        );

        expect(actual).toEqual(expected);
    });

    it('should return the original image if an invalid size is passed', () => {
        const expected = 'https://cdn.example.com/path/to/original/image.png?c=2';
        const actual = tools.image.getSrc(
            'https://cdn.example.com/path/to/{:size}/image.png?c=2',
            '100'
        );

        expect(actual).toEqual(expected);
    });
});
