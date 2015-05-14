import EventEmitter from 'asyncly/EventEmitter2';
import _ from 'lodash';
import $ from 'jquery';

export default class BaseEvents extends EventEmitter {
    /**
     *
     * @param {string} eventName
     * @param {object} data
     * @param {object} el
     * @returns {*}
     */
    emit(eventName, data, el) {
        return super.emit(eventName, data, el);
    }

    /**
     * @param {string|array} events
     * @param {string} eventName
     * @param {function} callback
     * @returns {*}
     */
    on(eventName, callback) {
        let eventTag = this.dataMap[eventName].eventTag;

        if (eventTag) {
            let trigger = this.dataMap[eventName].trigger.join(' ');

            $('body').on(trigger, eventTag, (event) => {
                let ele = document.querySelector(eventTag);
                this.emit(eventName, event, ele);
            });
        }

        return super.on(eventName, callback);
    }

    /**
     * @param {string|array} events
     * @param {string} eventName
     * @param {function} callback
     * @returns {*}
     */
    off(events, eventName, callback) {
        let eventTag = this.dataMap[eventName].eventTag,
            trigger = this.dataMap[eventName].trigger.join(' ');

        $('body').off(trigger, eventTag);

        return super.off(eventName, callback);
    }
}
