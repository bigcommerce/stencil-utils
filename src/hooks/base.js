import EventEmitter from 'asyncly/EventEmitter2';
import _ from 'lodash';
import $ from 'jquery';

export default class BaseHooks extends EventEmitter {
    /**
     *
     * @param {object} data
     * @param {object} el
     * @returns {*}
     */
    emit(eventName, event, ele, next) {
        return super.emit(eventName, event, ele, next);
    }

    /**
     * @param {string} eventName
     * @param {function} callback
     * @returns {*}
     */
    on(eventName, callback) {
        return super.on(eventName, callback);
    }

    /**
     * @param {string|array} events
     * @param {string} eventName
     * @param {function} callback
     * @returns {*}
     */
    off(eventName, callback) {
        return super.off(eventName, callback);
    }
}
