import { normalizeQueryStringParams } from '../lib/utils';
const queryString = require('query-string');

describe('Product Attributes', () => {
    it('should leave normalized params intact', () => {
        const qs = 'attribute[0]=123&attribute[1]=456&qty=1';
        const normalized = normalizeQueryStringParams(qs);

        expect(normalized).toEqual(qs);
    });

    it('should return a normalized querystring when passed empty array entries', () => {
        const qs = 'attribute[0]=123&attribute[1]=slate_grey&attribute[2]=&qty=1';
        const normalized = normalizeQueryStringParams(qs);

        expect(normalized).toEqual('attribute[0]=123&attribute[1]=slate_grey&qty=1');
    });

    it('should remove empty array members', () => {
        const qs = 'attribute[0]=123&attribute[1]=&qty=1';
        const normalized = normalizeQueryStringParams(qs);
        const parsed = queryString.parse(normalized, { arrayFormat: 'index' });
       
        expect(parsed['attribute'].length).toBe(1);
    });
});
