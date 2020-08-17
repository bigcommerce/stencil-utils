import { parse, stringify } from '../lib/query-string';

describe('queryString', () => {
    describe('parse', () => {
        it('should parse query string starting with a `?`', () => {
            expect(parse('?foo=bar')).toEqual({foo: 'bar'});
        });

        it('should handle correctly `?` and `#` in the same parameter name', () => {
            expect(parse('?foo=bar&baz=val#foo=key')).toEqual({foo: 'bar', baz: 'val#foo=key'});
        });
    
        it('should parse query strings starting with a `#`', () => {
            expect(parse('#foo=bar')).toEqual({foo: 'bar'});
        });
    
        it('should query strings starting with a `&`', () => {
            expect(parse('&foo=bar&foo=baz')).toEqual({foo: ['bar', 'baz']});
        });
    
        it('should parse a query string', () => {
            expect(parse('foo=bar')).toEqual({foo: 'bar'});
        });
    
        it('should parse multiple query string', () => {
            expect(parse('foo=bar&key=val')).toEqual({
                foo: 'bar',
                key: 'val'
            });
        });
    
        it('should handle wthiout value', () => {
            expect(parse('foo')).toEqual({ foo: null });
            expect(parse('foo&key=val')).toEqual({
                key: 'val',
                foo: null
            });
    
            expect(parse('foo&foo')).toEqual({foo: [null, null]});
            expect(parse('foo=&foo')).toEqual({foo: ['', null]});
        });
    
        it('should handle `+` correctly', () => {
            expect(parse('foo+faz=bar+baz++')).toEqual({'foo faz': 'bar baz  '});
        });
    
        it('should handle multiple of the same key', () => {
            expect(parse('foo=bar&foo=baz')).toEqual({foo: ['bar', 'baz']});
        });
    
        it('should handle multiple values and preserve appearence order', () => {
            expect(parse('a=value&a=')).toEqual({a: ['value', '']});
            expect(parse('a=&a=value')).toEqual({a: ['', 'value']});
        });
    
        it('should parse query strings to have corrected indexed arrays', () => {
            expect(parse('foo[0]=bar&foo[1]=baz')).toEqual({
                'foo[0]': 'bar',
                'foo[1]': 'baz'
            });
        });
    });

    describe('stringify', () => {
        it('should stringify correctly', () => {
            expect(stringify({foo: 'bar'})).toEqual('foo=bar');
            expect(stringify({foo: 'bar', bar: 'baz'})).toEqual('bar=baz&foo=bar');
        });
    
        it('should correnctly encode URI', () => {
            expect(stringify({'foo bar': 'baz faz'})).toEqual('foo%20bar=baz%20faz');
            expect(stringify({'foo bar': 'baz\'faz'})).toEqual('foo%20bar=baz%27faz');
        });
        
        it('should handle array value', () => {
            expect(stringify({
                abc: 'abc',
                foo: ['bar', 'baz']
            })).toEqual('abc=abc&foo=bar&foo=baz');
        });
    
        it('should handle empty array value', () => {
            expect(stringify({
                abc: 'abc',
                foo: []
            })).toEqual('abc=abc');
        });
        
        it('should not encode undefined values', () => {
            expect(stringify({
                abc: undefined,
                foo: 'baz'
            })).toEqual('foo=baz');
        });
    
        it('should handle null values in array', () => {
            expect(stringify({
                foo: null,
                bar: [null, 'baz']
            })).toEqual('bar&bar=baz&foo');
        });
        
        it('should handle undefined values in array', () => {
            expect(stringify({
                foo: null,
                bar: [undefined, 'baz']
            })).toEqual('bar=baz&foo');
        });
        
        it('should handle undefined and null values in array', () => {
            expect(stringify({
                foo: null,
                bar: [undefined, null, 'baz']
            })).toEqual('bar&bar=baz&foo');
        });

        it('should handle undefined and null values in array with filterValues options enabled', () => {
            expect(stringify({
                foo: '',
                bar: undefined,
            }, { filterValues: true })).toEqual('');
        });
        
        it('should strict encode', () => {
            expect(stringify({foo: '\'bar\''})).toEqual('foo=%27bar%27');
            expect(stringify({foo: ['\'bar\'', '!baz']})).toEqual('foo=%27bar%27&foo=%21baz');
        });
    });
});
