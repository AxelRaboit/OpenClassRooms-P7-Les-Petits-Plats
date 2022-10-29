export default class Error {
    constructor(message) {
        this.message = message;
    }

    view = () => {    
        const containerError = document.createElement('div');
        containerError.setAttribute('class', 'container-error');
    
        const errorMessage = document.createElement('h2');
        errorMessage.setAttribute('class', 'error-msg');
        errorMessage.innerText = this.message;
    
        containerError.appendChild(errorMessage);

        return containerError;
    }
}