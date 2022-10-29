export default class Error {
    constructor(message, color = null, backgroundColor = null) {
        this.message = message;
        this.color = (color ? color : '#000');
        this.backgroundColor = (backgroundColor ? backgroundColor : '#FFF');
    }

    view = () => {    
        const containerError = document.createElement('div');
        containerError.setAttribute('class', 'container-error');
    
        const errorMessage = document.createElement('h2');
        errorMessage.setAttribute('class', 'error-msg');
        errorMessage.style.color = this.color;
        errorMessage.style.backgroundColor = this.backgroundColor;
        errorMessage.innerText = this.message;
    
        containerError.appendChild(errorMessage);

        return containerError;
    }

    
}