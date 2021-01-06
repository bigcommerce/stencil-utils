import request from '../src/lib/request';

let responseData = '';
const response = {
    headers: {
        get: () => '',
    },
    text: () => new Promise((resolve) => {
        resolve(responseData);
    }),
};

describe('request', () => {
    beforeEach(() => {
        /* eslint-disable no-global-assign */
        fetch = jest.fn().mockImplementation(() => new Promise((resolve) => resolve(response)));
    });

    afterEach(() => {
        fetch.mockReset();
    });

    test('GET method', async () => {
        const cb = jest.fn();
        const opts = {
            method: 'GET',
            requestOptions: {
                params: {
                    list_all: 'size',
                },
            },
        };
        const url = '/bath/?_bc_fsnf=1&Size%5B%5D=Mediuma&Size%5B%5D=L';
        responseData = '11111';
        await request(url, opts, cb);
        expect(cb).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual(`${url}&list_all=size`);
    });

    test('GET method with params in url', async () => {
        const cb = jest.fn();
        const url = '/bath';
        const opts = {
            method: 'GET',
            requestOptions: {
                params: {
                    list_all: 'size',
                },
            },
        };
        responseData = '2222222';
        await request(url, opts, cb);
        expect(cb).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toEqual('/bath?list_all=size');
    });
});
