import BaseEvents from './base';

export default class AccountEvents extends BaseEvents {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};

        this.dataMap = {
            'account-item-add': {
                eventTag: '[data-account-add]'
            },
            'account-item-remove': {
                eventTag: '[data-account-remove]'
            },
            'account-sign-in': {
                eventTag: '[data-account-sign-in]'
            },
            'account-sign-out': {
                eventTag: '[data-account-sign-out]'
            },
            'account-create-start': {
                eventTag: '[data-account-create-start]'
            },
            'account-create': {
                eventTag: '[data-account-create]'
            }
        };
    }
}
