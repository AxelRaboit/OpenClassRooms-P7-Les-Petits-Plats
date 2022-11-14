import FilterDropdown from '../class/FilterDropdown.js';
import searchByMainInput from './searchByMainInput.js';
import searchByTags from './searchByTags.js';

const search = (activeTags, recipes) => {
    // Loop through each recipe and test if there is a match with the filters or the user's search
    recipes.forEach(recipe => {
        let visible = true;

        visible = searchByTags(recipe, activeTags, visible);

        visible = searchByMainInput(recipe, visible);

        // If the recipe element is hidden remove the class hidden otherwise add it
        if (recipe.element.classList.contains("hidden") === visible) {
            recipe.toggleVisibility();
        }
    });

    // Update the dropdowns
    FilterDropdown.updateDropDowns();

    // If no recipe match, display a message to the user that no recipe match with the search
    const visibleRecipes = document.querySelectorAll('.recipe:not(.hidden)');
    if(visibleRecipes.length === 0){
        document.querySelector('.recipes-container .empty-msg').innerHTML = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.";
        document.querySelector('.recipes-container .empty-msg').classList.add('visible');
    } else {
        document.querySelector('.recipes-container .empty-msg').classList.remove('visible');
    }
}
    
export default search;