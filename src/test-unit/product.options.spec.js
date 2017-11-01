import { normalizeQueryStringParams } from '../lib/utils';
const queryString = require('query-string');

describe('Product Attributes', () => {
    it('should leave normalized params intact', () => {
        const qs = 'attribute[0]=123&attribute[1]=456&qty=1';
        const normalized = decodeURIComponent(normalizeQueryStringParams(qs));

        expect(normalized).toEqual(qs);
    });

    it('should return a normalized querystring when passed empty array entries', () => {
        const qs = 'attribute[0]=123&attribute[1]=slate_grey&attribute[2]=&qty=1';
        const normalized = decodeURIComponent(normalizeQueryStringParams(qs));

        expect(normalized).toEqual('attribute[0]=123&attribute[1]=slate_grey&qty=1');
    });

    it('should preserve array indexes on a valid querystring', () => {
        const qs = 'action=add&product_id=753&attribute%5B714%5D=833&attribute%5B714%5D=123&qty%5B%5D=1';
        const normalized = decodeURIComponent(normalizeQueryStringParams(qs));
        
        expect(normalized).toEqual('action=add&attribute[714]=833&attribute[714]=123&product_id=753&qty[]=1');
    })
});
