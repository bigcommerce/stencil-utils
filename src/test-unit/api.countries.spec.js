import Country from '../api/countries';

describe('Countries', () => {
    let country;

    beforeEach(() => {
        country = new Country();
    });

    afterEach(() => {
    });

    // getById
    it('should use getById and return a number', () => {
        spyOn(country, 'remoteRequest').and.callFake((url, method, params, callback) => {
            callback('{"data":{"prefix":"Choose a State/Province","states":[{"id":"1","name":"Alabama"},{"id":"2","name":"Alaska"},{"id":"3","name":"American Samoa"},{"id":"4","name":"Arizona"},{"id":"5","name":"Arkansas"},{"id":"6","name":"Armed Forces Africa"},{"id":"7","name":"Armed Forces Americas"},{"id":"8","name":"Armed Forces Canada"},{"id":"9","name":"Armed Forces Europe"},{"id":"10","name":"Armed Forces Middle East"},{"id":"11","name":"Armed Forces Pacific"},{"id":"12","name":"California"},{"id":"13","name":"Colorado"},{"id":"14","name":"Connecticut"},{"id":"15","name":"Delaware"},{"id":"16","name":"District of Columbia"},{"id":"17","name":"Federated States Of Micronesia"},{"id":"18","name":"Florida"},{"id":"19","name":"Georgia"},{"id":"20","name":"Guam"},{"id":"21","name":"Hawaii"},{"id":"22","name":"Idaho"},{"id":"23","name":"Illinois"},{"id":"24","name":"Indiana"},{"id":"25","name":"Iowa"},{"id":"26","name":"Kansas"},{"id":"27","name":"Kentucky"},{"id":"28","name":"Louisiana"},{"id":"29","name":"Maine"},{"id":"30","name":"Marshall Islands"},{"id":"31","name":"Maryland"},{"id":"32","name":"Massachusetts"},{"id":"33","name":"Michigan"},{"id":"34","name":"Minnesota"},{"id":"35","name":"Mississippi"},{"id":"36","name":"Missouri"},{"id":"37","name":"Montana"},{"id":"38","name":"Nebraska"},{"id":"39","name":"Nevada"},{"id":"40","name":"New Hampshire"},{"id":"41","name":"New Jersey"},{"id":"42","name":"New Mexico"},{"id":"43","name":"New York"},{"id":"44","name":"North Carolina"},{"id":"45","name":"North Dakota"},{"id":"46","name":"Northern Mariana Islands"},{"id":"47","name":"Ohio"},{"id":"48","name":"Oklahoma"},{"id":"49","name":"Oregon"},{"id":"50","name":"Palau"},{"id":"51","name":"Pennsylvania"},{"id":"52","name":"Puerto Rico"},{"id":"53","name":"Rhode Island"},{"id":"54","name":"South Carolina"},{"id":"55","name":"South Dakota"},{"id":"56","name":"Tennessee"},{"id":"57","name":"Texas"},{"id":"58","name":"Utah"},{"id":"59","name":"Vermont"},{"id":"60","name":"Virgin Islands"},{"id":"61","name":"Virginia"},{"id":"62","name":"Washington"},{"id":"63","name":"West Virginia"},{"id":"64","name":"Wisconsin"},{"id":"65","name":"Wyoming"}]}}');
        });
        country.getById('226', (data) => {
            let rawData = JSON.parse(data);
            expect(rawData.data).toEqual(jasmine.objectContaining({
                'prefix': 'Choose a State/Province'
            }));

            expect(rawData.data.states).toEqual(jasmine.objectContaining([
                {"id":"1","name":"Alabama"},
                {"id":"2","name":"Alaska"}
            ]));
        });
        expect(country.remoteRequest).toHaveBeenCalled();
    });
});
