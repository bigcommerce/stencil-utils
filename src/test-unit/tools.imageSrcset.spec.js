import tools from '../tools';

describe('tools.imageSrcset', () => {
    it('should return a srcset if a valid image and srcset sizes are passed (inherent width)', () => {
        const expected = 'https://cdn.example.com/path/to/100w/image.png?c=2 100w, ' +
            'https://cdn.example.com/path/to/200w/image.png?c=2 200w, ' +
            'https://cdn.example.com/path/to/300w/image.png?c=2 300w, ' +
            'https://cdn.example.com/path/to/1000w/image.png?c=2 1000w';
        const actual = tools.imageSrcset.getSrcset('https://cdn.example.com/path/to/{:size}/image.png?c=2',
            {
                '100w': '100w',
                '200w': '200w',
                '300w': '300w',
                '1000w': '1000w',
            }
        );

        expect(actual).toEqual(expected);
    });

    it('should return a srcset if a valid image and srcset sizes are passed (pixel density)', () => {
        const expected = 'https://cdn.example.com/path/to/100x100/image.png?c=2 1x, ' +
            'https://cdn.example.com/path/to/150x150/image.png?c=2 1.5x, ' +
            'https://cdn.example.com/path/to/200x200/image.png?c=2 2x';
        const actual = tools.imageSrcset.getSrcset('https://cdn.example.com/path/to/{:size}/image.png?c=2',
            {
                '1x': '100x100',
                '1.5x': '150x150',
                '2x': '200x200',
            }
        );

        expect(actual).toEqual(expected);
    });

    it('should return a src if a valid image and srcset size is passed (inherent width)', () => {
        const expected = 'https://cdn.example.com/path/to/100w/image.png?c=2';
        const actual = tools.imageSrcset.getSrcset('https://cdn.example.com/path/to/{:size}/image.png?c=2',
            {
                '1x': '100w',
            }
        );

        expect(actual).toEqual(expected);
    });

    it('should return a src if a valid image and srcset size is passed (pixel density)', () => {
        const expected = 'https://cdn.example.com/path/to/100x100/image.png?c=2';
        const actual = tools.imageSrcset.getSrcset('https://cdn.example.com/path/to/{:size}/image.png?c=2',
            {
                '1x': '100x100',
            }
        );

        expect(actual).toEqual(expected);
    });

    it('should return a srcset made of default sizes if no sizes are provided', () => {
        const expected = 'https://cdn.example.com/path/to/80w/image.png?c=2 80w, ' +
            'https://cdn.example.com/path/to/160w/image.png?c=2 160w, ' +
            'https://cdn.example.com/path/to/320w/image.png?c=2 320w, ' +
            'https://cdn.example.com/path/to/640w/image.png?c=2 640w, ' +
            'https://cdn.example.com/path/to/960w/image.png?c=2 960w, ' +
            'https://cdn.example.com/path/to/1280w/image.png?c=2 1280w, ' +
            'https://cdn.example.com/path/to/1920w/image.png?c=2 1920w, ' +
            'https://cdn.example.com/path/to/2560w/image.png?c=2 2560w';
        const actual = tools.imageSrcset.getSrcset('https://cdn.example.com/path/to/{:size}/image.png?c=2');

        expect(actual).toEqual(expected);
    });

    it('should throw an error if an invalid srcset string is provided', () => {
        expect(() => {tools.imageSrcset.getSrcset('https://cdn.example.com/path/to/{:size}/image.png?c=2',
            {
                '100w': '100w',
                '1000w': '1000',
            }
        )}).toThrow(new Error('Invalid srcset descriptor or size'));
    });

    it('should throw an error if a non-object is provided as the sizes argument [array]', () => {
        expect(() => {tools.imageSrcset.getSrcset('https://cdn.example.com/path/to/{:size}/image.png?c=2',
            ['100w','200w']
        )}).toThrow(new Error('Invalid srcset descriptor or size'));
    });

    it('should throw an error if a non-object is provided as the sizes argument [string]', () => {
        expect(() => {tools.imageSrcset.getSrcset('https://cdn.example.com/path/to/{:size}/image.png?c=2',
            '100w'
        )}).toThrow(new Error('Invalid srcset descriptor or size'));
    });
});
