import EventEmitter from 'eventemitter2';
import $ from 'jquery';

export default class extends EventEmitter {
    constructor() {
        super();

        this.$body = $('body');
    }
}
