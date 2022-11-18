import FilterDropdown from '../class/FilterDropdown.js';

    const Normalize = string => string.normalize('NFD').toLowerCase();

    const search = (activeTags, recipes) => {
        const searchBar = document.getElementById('main-search__input');
        const searchTerms = (searchBar.value.length >= 3) ? Normalize(searchBar.value) : null;

        // Loop through each recipe and test if there is a match with the filters or the user's search
        recipes.forEach(recipe => {
            let visible = true;

            // If there is any active tags, check if the recipe has any of them
            if (activeTags.length > 0) {
                const appareils = [recipe.appliance.toLowerCase()];
                const ingredients = recipe.ingredients.map(ingredients => ingredients.ingredient.toLowerCase());
                const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
                // Get all the tags
                const allFilters = [...appareils, ...ingredients, ...ustensils];

                activeTags.forEach(tag => {
                    // If the tag is not included in allFilters, set visible to false
                    if (!allFilters.includes(tag.name.toLowerCase())) {
                        visible = false;
                    }
                })
            }

            // If the user type on the main search bar and it's superior or egal to 3 characters
            if (searchTerms) {
                const recipeName = Normalize(recipe.name);
                const recipeDescription = Normalize(recipe.description);
    
                if(!recipeName.includes(searchTerms) && !recipeDescription.includes(searchTerms)) {
                    visible = false;
                }
    
                if (visible === false) {
                    recipe.ingredients.forEach(ingredient => {
                        const ingredientName = Normalize(ingredient.ingredient);
                        !ingredientName.includes(searchTerms) && (visible = false);
                    });
                }
            }

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