import {BcEvents} from '../src/events/index';
import $ from 'jquery';

describe('BcEvents', ()=> {
    it('should return false if emitter emits without listener', () => {
        var events = new BcEvents();
        expect(events.emit('new-event')).toBeFalsy();
    });

    it('should return true when there is a listener for an emitter', () => {
        var events = new BcEvents();
        events.on('new-item', () => {});
        expect(events.emit('new-item')).toBeTruthy();
    });

    it('should add eventHandler to event handler object using on', () => {
        var events = new BcEvents();
        var eventHandler = events.on('new-event', (event)=> console.log(event));

        expect(eventHandler._events['new-event']).toBeDefined();
        expect(eventHandler._events.new).toBeUndefined();
    });

    it('should remove an eventHandler from the handler object', () => {
        var events = new BcEvents();

        //Needs to be a reference to the actual handler and not a new handler.
        var myListener = (event) => {
            console.log('test');
        };
        var eventHandler = events.on('new-event', myListener );

        expect(eventHandler._events['new-event']).toBeDefined();

        eventHandler.off('new-event', myListener);

        expect(eventHandler._events['new-event']).toBeUndefined();
    });

    it('should initialize the emitters', () => {
        var mockedDocument = document.createElement('body');
        mockedDocument.innerHTML = '<button data-cart-add-item>My Button</button>';

        var mockData = {
            dataMap: {
                '[data-cart-add-item]': 'cart-add-item'
            }
        };
        var events = new BcEvents();

        spyOn(document, 'querySelector').and.returnValue(mockedDocument);
        spyOn($.fn, 'on');

        events.emitterInit.apply(mockData,[]);

        expect(document.querySelector).toHaveBeenCalled();
        expect($.fn.on).toHaveBeenCalled();
        expect($.fn.on.calls.argsFor(0)[0]).toEqual('click');
        expect($.fn.on.calls.argsFor(0)[1]).toEqual('[data-cart-add-item]');

    });

});
