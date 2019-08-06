import EventEmitter from 'eventemitter2';

export default class extends EventEmitter {
    constructor() {
        super();
        this.body = document.body;
    }
}
