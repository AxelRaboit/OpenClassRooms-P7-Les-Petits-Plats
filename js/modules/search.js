import FilterDropdown from '../class/FilterDropdown.js';
import searchTags from './searchTags.js';
import searchMainInput from './searchMainInput.js';
import visibilityMessage from './visibilityMessage.js';
import recipeDisplayer from './recipeDisplayer.js';

const search = (activeTags, recipes) => {
    recipes.forEach(recipe => {
        let visible = true;

        // If tags are used, check if the recipe match with the tags
        visible = searchTags(activeTags, recipe, visible);
        // If the main search bar is used, check if the recipe match with the search terms
        visible = searchMainInput(recipe, visible);

        recipeDisplayer(recipe, visible);
        
    });

    FilterDropdown.updateDropDowns();

    visibilityMessage();
}

export default search;