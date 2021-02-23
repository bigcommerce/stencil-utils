import EventEmitter from 'eventemitter3';

export default class extends EventEmitter {
    subscribe(eventName, elementSelector, handler) {
        document.addEventListener(eventName, function (e) {
            for (let { target } = e; target && target !== this; target = target.parentNode) {
                if (target.matches(elementSelector)) {
                    handler.call(target, e, target);
                    break;
                }
            }
        }, false);
    }
}
