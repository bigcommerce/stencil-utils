import BcEvents from './index';
import _ from 'lodash';

export default class AccountEvents extends BcEvents {

    /**
     *
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};

        this.dataMap = {
            '[data-account-add]': 'account-item-add',
            '[data-account-remove]': 'account-item-remove',
            '[data-account-sign-in]': 'account-sign-in',
            '[data-account-sign-out]': 'account-sign-out',
            '[data-account-create-start]': 'account-create-start',
            '[data-account-create]': 'account-create'
        };
    }
}
