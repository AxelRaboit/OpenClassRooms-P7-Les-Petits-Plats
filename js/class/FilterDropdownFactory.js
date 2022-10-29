import FilterDropdown from "./FilterDropdown.js";
/* import DOM from "../modules/dom.js"; */
import TagFactory from "./TagFactory.js";
import Dropdown from "./FilterDropdown.js";

export default class FilterDropdownFactory {
    static createFilterDropdown = (tags) => {
        const { ingredients, appareils, ustensiles } = tags;

        new FilterDropdown('ingredient', ingredients);
        new FilterDropdown('appareil', appareils);
        new FilterDropdown('ustensile', ustensiles);
    }

    static createDropdowns() {
        TagFactory.createTags();

        Dropdown.instances.forEach(dropdown => {
            DOM.append(dropdown.element, document.getElementById('filters-dropdown'));
        });
    }
}
