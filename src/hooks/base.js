import EventEmitter from 'asyncly/EventEmitter2';
import _ from 'lodash';
import $ from 'jquery';

export default class extends EventEmitter {
    /**
     *
     * @param {string} eventName
     * @param {object} event
     * @param {object} ele
     * @param {function} next
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
     * @param {string} eventName
     * @param {function} callback
     * @returns {*}
     */
    off(eventName, callback) {
        return super.off(eventName, callback);
    }
}
