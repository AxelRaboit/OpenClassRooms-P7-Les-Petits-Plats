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
}
