import Base from '../../src/bodl/handlers/base';

describe('Bodl Base Class', () => {
    it('should throw an error creating a new instance', () => {
        expect(() => {
            // eslint-disable-next-line no-new
            new Base();
        }).toThrowError('Not implemented');
    });
});
