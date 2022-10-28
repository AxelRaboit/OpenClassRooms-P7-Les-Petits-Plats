import Api from "./Api.js";
import Tags from "./Tags.js";
import FilterDropdownFactory from "./FilterDropDownFactory.js";

export default class TagFactory {

    static createTags = () => {
        const ingredients = Api.getAllIngredients().map(ingredient => new Tags('ingrédient', ingredient));
        const appareils = Api.getAllAppliances().map(appareil => new Tags('appareil', appareil));
        const ustensiles = Api.getAllUstensils().map(ustensile => new Tags('ustensile', ustensile));

        // create object with all tags
        const tags = {
            ingredients,
            appareils,
            ustensiles
        }

        FilterDropdownFactory.createFilterDropdown(tags);
    }
}