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
                eventTag: '[data-account-add]',
                trigger: ['click']
            },
            'account-item-remove': {
                eventTag: '[data-account-remove]',
                trigger: ['click']
            },
            'account-sign-in': {
                eventTag: '[data-account-sign-in]',
                trigger: ['click']
            },
            'account-sign-out': {
                eventTag: '[data-account-sign-out]',
                trigger: ['click']
            },
            'account-create-start': {
                eventTag: '[data-account-create-start]',
                trigger: ['click']
            },
            'account-create': {
                eventTag: '[data-account-create]',
                trigger: ['click']
            }
        };
    }
}
