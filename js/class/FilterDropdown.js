import utils from '../modules/utils.js';

export default class FilterDropdown {
    constructor(type, items) {
        this.type = type;
        this.items = items;
        this.label = type;
        this.tagList = [];
        this.create();

        FilterDropdown.instances = [...FilterDropdown.instances, this];
    }

    static instances = [];

    create = () => {
        // Container creation
        const container = document.createElement('div');
        container.setAttribute('class', `dropdown-item dd-${this.type}`);
        container.setAttribute('data-state', 'close');

        // Input field creation
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'dropdown-item__input');
        input.setAttribute('id', `${this.type}-input`);
        input.setAttribute('name', `${this.type}-input`);
        // if this.label ends by 's' we remove it otherwise we do nothing
        input.setAttribute(
            'placeholder',
            `Rechercher un ${this.label.slice(-1) === 's' ? this.label.slice(0, -1) : this.label}`
        );

        // Add a listener to the input field to filter the dropdown list
        input.addEventListener('input', this.search)

        // Label creation
        const label = document.createElement('p');
        label.setAttribute('class', 'dropdown-item__label');
        label.innerText = `${this.label}`;

        // Icon creation
        const icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-chevron-down dropdown-item__icon');
        this.closeIcon = icon;

        // List item
        const list = document.createElement('ul');
        list.setAttribute('class', `dropdown-item__list ${this.type}-dropdown`);

        // Fill the list
        this.items.forEach(item => {
            list.appendChild(item.listElement());
            this.tagList = [...this.tagList, item];
        });

        // Error message about no filter available
        const emptyMsg = document.createElement('p');
        emptyMsg.setAttribute('class', 'empty-msg');
        emptyMsg.innerText = "Aucun filtre disponible";

        list.appendChild(emptyMsg);

        container.appendChild(input);
        container.appendChild(label);
        container.appendChild(icon);
        container.appendChild(list);

        // On click on the container, open the dropdown
        container.addEventListener('click', this.open)

        this.element = container;
    }

    /**
     * Open the dropdown when the user click on it
     * @param {PointerEvent} e 
     */
    open = (e) => {
        e.stopPropagation();
        FilterDropdown.instances.forEach(dropdown => {
            if (this.element.getAttribute('data-state') === 'close') {
                this.element.setAttribute('data-state', 'open');
                // When the user click outisde the dropdown, close it
                document.addEventListener('click', this.close);
                this.element.removeEventListener('click', this.open);
            }

            if (dropdown.element.getAttribute('data-state') === 'open' && dropdown.element !== this.element) {
                dropdown.element.setAttribute('data-state', 'close');
                // When the user click outisde the dropdown, close it
                document.removeEventListener('click', dropdown.close);
                dropdown.element.addEventListener('click', dropdown.open);
            }
        });
    }

    /**
     * Close the dropdown when the user click outside of it
     * @param {PointerEvent} e 
     */
    close = (e) => {
        if (utils.clickOut(e.target, this.element) || e.target === this.closeIcon) {
            this.element.setAttribute('data-state', 'close');
            document.removeEventListener('click', this.close);
            this.element.addEventListener('click', this.open);
        }
    }

    /**
     * Search in the list of tags the tags corresponding to the user's input
     * @param {InputEvent} e 
     */
    search = (e) => {
        const content = e.target.value.toLowerCase();

        /* if when the user type it's superior or egal to 3 characters
        or when the user use the backspace and it's superior or egal to 2 characters */
        if (content.length >= 3 || (e.inpuType === 'deleteContentBackward' && content.length >= 3)) {
            this.element.classList.add('entries');
            this.tagList.forEach(tag => {
                let str = tag.name.toLowerCase();
                if (str.includes(content)) {
                    // if the tag name contains the user's input, we show it
                    tag.listElementResult.classList.remove('hidden-by-keydown');
                } else {
                    // if the tag name doesn't contain the user's input, we hide it
                    tag.listElementResult.classList.add('hidden-by-keydown');
                }
            });
        } else {
            this.element.classList.remove('entries');
            this.tagList.forEach(tag => {
                tag.listElementResult.classList.remove('hidden-by-keydown');
            });
        };

        FilterDropdown.emptyMessage();
    }

    static emptyMessage = () => {
        // Get all elements from the dropdown list that are not hidden
        let ingredient = document.querySelectorAll('.ingredients-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)');
        let appareil = document.querySelectorAll('.appareils-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)');
        let ustensile = document.querySelectorAll('.ustensiles-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)');
        
        // If there is no element in the list, we show the error message
        if (appareil.length === 0) {
            document.querySelector('.appareils-dropdown .empty-msg').classList.add('visible');
        } else {
            document.querySelector('.appareils-dropdown .empty-msg').classList.remove('visible');
        }

        if (ingredient.length === 0) {
            document.querySelector('.ingredients-dropdown .empty-msg').classList.add('visible');
        } else {
            document.querySelector('.ingredients-dropdown .empty-msg').classList.remove('visible');
        }

        if (ustensile.length === 0) {
            document.querySelector('.ustensiles-dropdown .empty-msg').classList.add('visible');
        } else {
            document.querySelector('.ustensiles-dropdown .empty-msg').classList.remove('visible');
        }
    }

}
