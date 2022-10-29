import DOM from '../modules/DOM.js';
import Recipe from './Recipe.js';

export default class Tag {
    constructor(type, name) {
        this.type = type;
        this.name = name.toLowerCase();

        Tag.instances = [...Tag.instances, this];
    }

    static instances = [];
    static active = [];

    /**
     * Element list tags element
     * @returns {HTMLElement} Element List
     */
    listElement = () => {
        // if this.listElement is already defined, we return it instead of create a new one
        if (this.listElementResult) {
            return this.listElementResult;
        }

        const element = document.createElement('li');
        element.setAttribute('data-value', this.name);
        element.innerText = this.name;

        element.addEventListener('click', this.add);

        this.listElementResult = element;

        return element;
    }

    /**
     * Tag element
     * @returns {HTMLElement}
     */
    tag = () => {

        // if this.tag is already defined, we return it instead of create a new one
        if (this.tagResult) {
            return this.tagReults;
        }

        let element = document.createElement('li');
        element.setAttribute('class', `tag tag-${this.type}`);

        let deleteBtn = document.createElement('i');
        deleteBtn.setAttribute('class', 'far fa-times-circle tag__icon');
        deleteBtn.addEventListener('click', this.delete)

        element.innerText = this.name;
        element.appendChild(deleteBtn);

        this.tagResult = element;
        
        return element;
    }

    /**
     * Add the tag to the active tags and display it on the active tags list
     */
    add = () => {
        Tag.active = [...Tag.active, this];

        DOM.append(this.tag(), document.getElementById('tags-list'));
        this.listElementResult.classList.add('already-selected');
    }

    /**
     * Delete the tag from the active tags and remove it from the tags list
     */
    delete = () => {
        let newActiveTags = Tag.active.filter(tag => tag !== this);
        Tas.active = newActiveTags;

        DOM.remove(this.tag());
        search(Tag.active, Recipe.instances);
        this.listElementRes.classList.remove('already-selected');
    }
}
