import BaseEvents from './base';

export default class AccountEvents extends BaseEvents {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};

        this.dataMap = {
            '[data-account-add]': {
                eventName: 'account-item-add',
                trigger: ['click']
            },
            '[data-account-remove]': {
                eventName: 'account-item-remove',
                trigger: ['click']
            },
            '[data-account-sign-in]': {
                eventName: 'account-sign-in',
                trigger: ['click']
            },
            '[data-account-sign-out]': {
                eventName: 'account-sign-out',
                trigger: ['click']
            },
            '[data-account-create-start]': {
                eventName: 'account-create-start',
                trigger: ['click']
            },
            '[data-account-create]': {
                eventName: 'account-create',
                trigger: ['click']
            }
        };
    }
}
