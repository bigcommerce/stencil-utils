import EventEmitter from 'asyncly/EventEmitter2';
import $ from 'jquery';

export default class extends EventEmitter {
    constructor() {
        super();

        this.$body = $('body');
    }
}
