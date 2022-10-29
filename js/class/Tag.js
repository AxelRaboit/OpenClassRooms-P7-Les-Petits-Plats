export default class Tag {
    constructor(type, name) {
        this.type = type;
        this.name = name;

        Tag.instances = [...Tag.instances, this];
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

        const element = document.createElement('li');
        element.setAttribute('data-value', this.name);
        element.innerText = this.name;

        this.listElementResult = element;

        return element;
    }
}
