import FilterDropdown from '../class/FilterDropdown.js';

    const Normalize = string => string.normalize('NFD').toLowerCase();

    const search = (activeTags, recipes) => {
        const searchBar = document.getElementById('main-search__input');
        const searchTerms = (searchBar.value.length >= 3) ? Normalize(searchBar.value) : null;

        let selectedRecipesBySearch = [];

        if (searchBar.value.length >= 3) {
        
            recipes.forEach(recipe => recipe.element.classList.add('hidden'));
    
            recipes.filter((recipe) => {
                const recipeName = Normalize(recipe.name);
                const recipeDescription = Normalize(recipe.description);
    
                if(recipeName.includes(searchTerms) || recipeDescription.includes(searchTerms)) {
                    selectedRecipesBySearch.push(recipe);
                    /* selectedRecipesBySearch = [...new Set(selectedRecipesBySearch)]; */
                }
    
                recipe.ingredients.forEach(ingredient => {
                    const ingredientName = Normalize(ingredient.ingredient);
                    ingredientName.includes(searchTerms) && selectedRecipesBySearch.push(recipe);
                });
    
            })
        } else {
            recipes.forEach(recipe => {
                if (recipe.element.classList.contains('hidden')) {
                    recipe.toggleVisibility();
                }
            })
        }

        selectedRecipesBySearch.forEach((recipe) => {
            if (recipe.element.classList.contains("hidden")) {
                recipe.toggleVisibility();
            } else {
                recipe.toggleVisibility();
            }
        })
    
        if (activeTags.length > 0) {
            recipes.filter((recipe) => {
                const appareils = [recipe.appliance.toLowerCase()];
                const ingredients = recipe.ingredients.map(ingredients => ingredients.ingredient.toLowerCase());
                const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
                const allFilters = [...appareils, ...ingredients, ...ustensils];
        
                activeTags.forEach(tag => {
                    if (allFilters.includes(tag.name.toLowerCase())) {
                        if (recipe.element.classList.contains("hidden")) {
                            recipe.toggleVisibility();
                        }
                    }
                })
            })
        }
    
        // Loop through each recipe and test if there is a match with the filters or the user's search
        recipes.forEach(recipe => {
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
                        recipe.toggleVisibility();
                    }
                })
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