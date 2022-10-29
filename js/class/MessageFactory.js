import DOM from "../modules/dom.js";
import Message from "./Message.js";

/* function Builder(item, target) {
    DOM.append(item.view(), target);
}

export default class MessageFactory {   
    static builder = (item, target) => {
        Builder(item, target);
    }

    static createError = (message, target) => {
        const item = new Message(message, '#FFFF', '#ED6454');
        Builder(item, target);
    }

    static createSuccess = (message, target) => {
        const item = new Message(message, '#FFFF', '#68D9A4');
        Builder(item, target);
    }

    static createWarning = (message, target) => {
        const item = new Message(message, '#FFFF', '#edc213');
        Builder(item, target);
    }
} */

export default class MessageFactory {   
    
    static builder = (item, target) => {
        DOM.append(item.view(), target);
    }

    static createError = (message, target) => {
        const item = new Message(message, '#FFFF', '#ED6454');
        this.builder(item, target);
    }

    static createSuccess = (message, target) => {
        const item = new Message(message, '#FFFF', '#68D9A4');
        this.builder(item, target);
    }

    static createWarning = (message, target) => {
        const item = new Message(message, '#FFFF', '#edc213');
        this.builder(item, target);
    }
}
