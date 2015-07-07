import $ from 'jquery'
import Remote from './remote';
import Hooks from '../hooks';

export default class extends Remote
{
    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        $(document).ready(() => {
            this.privacyNotificationCheck();
        });
    }

    /**
     * Checks whether or not the control panel privacy cookie is enabled and gets the response to show
     */
    privacyNotificationCheck() {
        this.makeRequest('/cookieNotification', 'GET', {}, (err, response) => {
            if (!err) {
                let notifyShopper = response.data.PrivacyCookieEnabled,
                    alreadyAcceptedCookies = document.cookie.indexOf('ACCEPT_COOKIE_USAGE') !== -1;

                if (notifyShopper && !alreadyAcceptedCookies) {
                    let date = new Date();
                    date.setDate(date.getDate() + 365);
                    document.cookie = `ACCEPT_COOKIE_USAGE=1;expires=${date.toGMTString()}; path=/`;

                    if (!Hooks.emit('cookie-privacy-notification', response.data.PrivacyCookieNotification)) {
                        alert(response.data.PrivacyCookieNotification);
                    }
                }
            }
        });
    }
}
