import DOM from "../modules/dom.js";

export default class ErrorFactory {
    constructor(message) {
        this.message = message;
    }

    view = () => {    
        let containerError = document.createElement('div');
        containerError.setAttribute('class', 'container-error');
    
        let errorMessage = document.createElement('h2');
        errorMessage.setAttribute('class', 'error-msg');
        errorMessage.innerText = this.message;
    
        containerError.appendChild(errorMessage);

        return containerError;
    }
    
    static createError = (error) => {
        let item = new ErrorFactory(error.message);
        DOM.append(item.view(), document.body);
    }
}