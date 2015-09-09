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

    maintenanceNotice(maintenanceMode) {
        let scrollTop = 0,
            header = maintenanceMode.header,
            notice = maintenanceMode.notice,
            $element;

        if (!(header && notice)) {
            return;
        }

        $element = $('<div>', {
            'id': 'maintenance-notice',
            'class': 'maintenance-mode-notice'
        }).html(`<div class="maintenance-mode-header">${header}</div>${notice}`);
        
        $('body').append($element);

        $(window)
            .bind('scroll', () => {
                $element.style.top = ($('body').scrollTop() + scrollTop) + "px";
            })
            .bind('resize', (event) => {
                let menuWidth = $('#maintenance-notice').width();
                if (menuWidth + $('#maintenance-notice').offset().left > $(window).width()) {
                    let newLeft = ($(window).width() - menuWidth - 50) + 'px';
                    $('#maintenance-notice').css('left', newLeft);
                }
            });

        scrollTop = $('#maintenance-notice').scrollTop() - $('body').scrollTop();
        $(window).trigger('resize');
    }
}
