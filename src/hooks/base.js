import EventEmitter from 'eventemitter3';

export default class extends EventEmitter {
    on(eventName, elementSelector, handler) {
        document.addEventListener(eventName, function (e) {
            for (let target = e.target; target && target !== this; target = target.parentNode) {
                if (target.matches(elementSelector)) {
                    handler.call(target, e);
                    break;
                }
            }
        }, false);
    }
}
