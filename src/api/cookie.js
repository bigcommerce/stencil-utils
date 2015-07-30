import $ from 'jquery'
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
        let alreadyAcceptedCookies = document.cookie.indexOf('ACCEPT_COOKIE_USAGE') !== -1;
        if (alreadyAcceptedCookies) {
            return;
        }

        this.remoteRequest('/cookie-notification', 'GET', {}, (err, response) => {
            if (!err) {
                let notifyShopper = response.data.PrivacyCookieEnabled,
                    date = new Date(),
                    event = {
                        defaultPrevented: false,
                        preventDefault: function() {
                            this.defaultPrevented = true;
                        }
                    };

                if (!notifyShopper) {
                    return false;
                }

                date.setDate(date.getDate() + 365);

                document.cookie = `ACCEPT_COOKIE_USAGE=1;expires=${date.toGMTString()}; path=/`;

                Hooks.emit('cookie-privacy-notification', event, response.data.PrivacyCookieNotification);

                if (!event.defaultPrevented) {
                    alert(response.data.PrivacyCookieNotification);
                }
            }
        });
    }
}
