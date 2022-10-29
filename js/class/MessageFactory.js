import DOM from "../modules/dom.js";
import Message from "./Message.js";


export default class MessageFactory {    
    static createError = (message, target) => {
        const item = new Message(message, '#FFFF', '#ED6454');
        DOM.append(item.view(), target);
    }

    static createSuccess = (message, target) => {
        const item = new Message(message, '#FFFF', '#68D9A4');
        DOM.append(item.view(), target);
    }

    static createWarning = (message, target) => {
        const item = new Message(message, '#FFFF', '#edc213');
        DOM.append(item.view(), target);
    }
}
