import closest from '../lib/closest';

describe('closest', () => {
    beforeEach(() => {
        const fixture = '<div id="fixture">' +
            '<input id="x" type="text">' +
            '<input id="y" type="text">' +
            '<input id="add" type="button" value="Add Numbers">' +
            'Result: <span id="result" />' +
            '</div>';

        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture);
    });

    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    it('should return the parent div closest to the span with id of result', () => {
        expect(document.getElementById('result').closest('div').id).toBe('fixture');
    });

    it('should return the parent div closest to the input with id of add', () => {
        expect(document.getElementById('add').closest('div').id).toBe('fixture');
    });

    it('should return the element itself when querying for closest element if it matches element', () => {
        expect(document.getElementById('fixture').closest('div').id).toBe('fixture');
    });

    it('should return null when there is no matching selector', () => {
        expect(document.getElementById('fixture').closest('form')).toBe(null);
    });
});
