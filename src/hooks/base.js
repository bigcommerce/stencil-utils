import EventEmitter from 'eventemitter3';
import $ from 'jquery';

export default class extends EventEmitter {
    constructor() {
        super();

        this.$body = $('body');
    }
}
