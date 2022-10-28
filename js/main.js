import DOM from "./modules/dom.js";
import Api from "./class/Api.js";
import Recipe from "./class/Recipe.js";
import FilterDropdown from "./class/FilterDropdown.js";
import Tags from "./class/Tags.js";

try {
    await Api.init();

    const ingredients = Api.getAllIngredients().map(ingredient => new Tags('ingrédient', ingredient));
    const appareils = Api.getAllAppliances().map(appareil => new Tags('appareil', appareil));
    const ustensiles = Api.getAllUstensils().map(ustensile => new Tags('ustensile', ustensile));

    new FilterDropdown('ingredient', ingredients);
    new FilterDropdown('appareil', appareils);
    new FilterDropdown('ustensile', ustensiles);

    FilterDropdown.instances.forEach(dropdown => {
        DOM.append(dropdown.element, document.getElementById('filters-dropdown'));
    });
    

    Api.getAllRecipes().forEach(recipe => {
        let item = new Recipe(recipe);
        DOM.append(item.view(), document.getElementById("recipes-container"));
    });


} catch (err) {
    let containerError = document.createElement('div');
    containerError.setAttribute('class', 'container-error');

    let errorMessage = document.createElement('h2');
    errorMessage.setAttribute('class', 'error-msg');
    errorMessage.innerText = err.message;

    containerError.appendChild(errorMessage);

    document.body.appendChild(containerError);
}