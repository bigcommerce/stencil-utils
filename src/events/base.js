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
    on(events, eventName, callback) {
        let eventsParse = this.parseEvent(events, eventName);

        $('body').on(eventsParse.eventsString, eventsParse.eventTag, (event) => {
            let ele = document.querySelector(eventsParse.eventTag);
            this.emit(eventsParse.eventNamespace, event, ele);
        });

        return super.on(eventsParse.eventNamespace, callback);
    }

    /**
     * @param {string|array} events
     * @param {string} eventName
     * @param {function} callback
     * @returns {*}
     */
    off(events, eventName, callback) {
        let eventsParse = this.parseEvent(events, eventName);
        $('body').off(eventsParse.eventsString, eventsParse.eventTag);
        return super.off(eventsParse.eventNamespace, callback);
    }

    /**
     * Parses the event and the event name
     *
     * @param {string|array} events
     * @param {string} eventName
     * @returns {*}
     */
    parseEvent(events, eventName) {
        let eventTag = this.dataMap[eventName].eventTag,
            eventNamespace,
            eventsString;

        // convert to array if string is passed
        if (_.isString(events)) {
            events = [events];
        }

        eventsString = events.join(' ');
        eventNamespace = eventName + eventsString;

        return {
            eventTag: eventTag,
            eventsString: eventsString,
            eventNamespace: eventNamespace
        }
    }
}
