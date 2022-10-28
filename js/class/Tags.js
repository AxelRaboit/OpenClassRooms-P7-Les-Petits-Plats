export default class Tags {
    constructor(type, name) {
        this.type = type;
        this.name = name;

        Tags.instances = [...Tags.instances, this];
    }

    static instances = [];

    /**
     * Element list tags element
     * @returns {HTMLElement} Element List
     */
    listElement = () => {
        if (this.listElementResult) {
            return this.listElementResult;
        }

        let element = document.createElement('li');
        element.setAttribute('data-value', this.name);
        element.innerText = this.name;

        this.listElementResult = element;

        return element;
    }
}
