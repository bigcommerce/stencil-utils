import { parse, stringify } from '../src/lib/query-string';

describe('queryString', () => {
    describe('parse', () => {
        test('should parse query string starting wtesth a `?`', () => {
            expect(parse('?foo=bar')).toEqual({ foo: 'bar' });
        });

        test('should handle correctly `?` and `#` in the same parameter name', () => {
            expect(parse('?foo=bar&baz=val#foo=key')).toEqual({ foo: 'bar', baz: 'val#foo=key' });
        });

        test('should parse query strings starting wtesth a `#`', () => {
            expect(parse('#foo=bar')).toEqual({ foo: 'bar' });
        });

        test('should query strings starting wtesth a `&`', () => {
            expect(parse('&foo=bar&foo=baz')).toEqual({ foo: ['bar', 'baz'] });
        });

        test('should parse a query string', () => {
            expect(parse('foo=bar')).toEqual({ foo: 'bar' });
        });

        test('should parse multiple query string', () => {
            expect(parse('foo=bar&key=val')).toEqual({
                foo: 'bar',
                key: 'val',
            });
        });

        test('should handle wthiout value', () => {
            expect(parse('foo')).toEqual({ foo: null });
            expect(parse('foo&key=val')).toEqual({
                key: 'val',
                foo: null,
            });

            expect(parse('foo&foo')).toEqual({ foo: [null, null] });
            expect(parse('foo=&foo')).toEqual({ foo: ['', null] });
        });

        test('should handle `+` correctly', () => {
            expect(parse('foo+faz=bar+baz++')).toEqual({ 'foo faz': 'bar baz  ' });
        });

        test('should handle multiple of the same key', () => {
            expect(parse('foo=bar&foo=baz')).toEqual({ foo: ['bar', 'baz'] });
        });

        test('should handle multiple values and preserve appearence order', () => {
            expect(parse('a=value&a=')).toEqual({ a: ['value', ''] });
            expect(parse('a=&a=value')).toEqual({ a: ['', 'value'] });
        });

        test('should parse query strings to have corrected indexed arrays', () => {
            expect(parse('foo[0]=bar&foo[1]=baz')).toEqual({
                'foo[0]': 'bar',
                'foo[1]': 'baz',
            });
        });
    });

    describe('stringify', () => {
        test('should stringify correctly', () => {
            expect(stringify({ foo: 'bar' })).toEqual('foo=bar');
            expect(stringify({ foo: 'bar', bar: 'baz' })).toEqual('bar=baz&foo=bar');
        });

        test('should correnctly encode URI', () => {
            expect(stringify({ 'foo bar': 'baz faz' })).toEqual('foo%20bar=baz%20faz');
            expect(stringify({ 'foo bar': 'baz\'faz' })).toEqual('foo%20bar=baz%27faz');
        });

        test('should handle array value', () => {
            expect(stringify({
                abc: 'abc',
                foo: ['bar', 'baz'],
            })).toEqual('abc=abc&foo=bar&foo=baz');
        });

        test('should handle empty array value', () => {
            expect(stringify({
                abc: 'abc',
                foo: [],
            })).toEqual('abc=abc');
        });

        test('should not encode undefined values', () => {
            expect(stringify({
                abc: undefined,
                foo: 'baz',
            })).toEqual('foo=baz');
        });

        test('should handle null values in array', () => {
            expect(stringify({
                foo: null,
                bar: [null, 'baz'],
            })).toEqual('bar&bar=baz&foo');
        });

        test('should handle undefined values in array', () => {
            expect(stringify({
                foo: null,
                bar: [undefined, 'baz'],
            })).toEqual('bar=baz&foo');
        });

        test('should handle undefined and null values in array', () => {
            expect(stringify({
                foo: null,
                bar: [undefined, null, 'baz'],
            })).toEqual('bar&bar=baz&foo');
        });

        test('should handle undefined and null values in array wtesth filterValues options enabled', () => {
            expect(stringify({
                foo: '',
                bar: undefined,
            }, { filterValues: true })).toEqual('');
        });

        test('should strict encode', () => {
            expect(stringify({ foo: '\'bar\'' })).toEqual('foo=%27bar%27');
            expect(stringify({ foo: ['\'bar\'', '!baz'] })).toEqual('foo=%27bar%27&foo=%21baz');
        });
    });
});
