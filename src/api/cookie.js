import $ from 'jquery';
import Base from './base';
import Hooks from '../hooks';

export default class extends Base
{
    /**
     * @Constructor
     */
    constructor(version) {
        // call parent
        super(version);

        $(document).ready(() => {
            this.privacyNotificationCheck();
        });
    }

    /**
     * Checks whether or not the control panel privacy cookie is enabled and gets the response to show
     */
    privacyNotificationCheck() {
        const alreadyAcceptedCookies = document.cookie.indexOf('ACCEPT_COOKIE_USAGE') !== -1;

        if (alreadyAcceptedCookies) {
            return;
        }

        this.remoteRequest('/cookie-notification', 'GET', {}, (err, response) => {
            if (err || !response) {
                return;
            }

            const notifyShopper = response.data.PrivacyCookieEnabled;
            const date = new Date();
            const event = {
                defaultPrevented: false,
                preventDefault() {
                    this.defaultPrevented = true;
                },
            };

            if (!notifyShopper) {
                return false;
            }

            date.setDate(date.getDate() + 365);
            Hooks.emit('cookie-privacy-notification', event, response.data.PrivacyCookieNotification);

            // Set up handler to listen if the cookie was accepted.
            if (event.defaultPrevented) {
                Hooks.on('cookie-privacy-accepted', () => {
                    document.cookie = `ACCEPT_COOKIE_USAGE=1;expires=${date.toGMTString()}; path=/`;
                });
            } else {
                const confirmed = confirm(response.data.PrivacyCookieNotification);
                if (confirmed) {
                    document.cookie = `ACCEPT_COOKIE_USAGE=1;expires=${date.toGMTString()}; path=/`;
                }
            }
        });
    }
}
