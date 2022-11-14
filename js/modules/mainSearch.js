const mainSearchVisibleChecker = (recipe, visible) => {
    // Get the main search input
    const searchBar = document.getElementById('main-search__input');

    // Get the value of the search input if the value length is greater or equal than 3 or return null
    const search = (searchBar.value.length >= 3) ? searchBar.value.toLowerCase() : null;

    // For each recipe if the search value is included in the recipe name, set visible to true otherwise set it to false
    let visibility = visible;

    recipe.ingredients.forEach(current => {
        if (!current.ingredient.toLowerCase().includes(search) && !recipe.description.toLowerCase().includes(search) && !recipe.name.toLowerCase().includes(search)) {
            visibility = false;
        }
    });

    /* for (let i = 0; i < recipe.ingredients.length; i++) {
        const current = recipe.ingredients[i];
        if (!current.ingredient.toLowerCase().includes(search) && !recipe.description.toLowerCase().includes(search) && !recipe.name.toLowerCase().includes(search)) {
            visibility = false;
        }
    } */

    return visibility;
}

export default mainSearchVisibleChecker;


/* const mainSearchChecker = (recipe, visible) => {
    // Get the main search input
    const searchBar = document.getElementById('main-search__input');

    // Get the value of the search input if the value length is greater or equal than 3 or return null
    const search = (searchBar.value.length >= 3) ? searchBar.value.toLowerCase() : null;

    // For each recipe if the search value is included in the recipe name, set visible to true otherwise set it to false
    let visibility = visible;

    recipe.ingredients.forEach(current => {
        if (!current.ingredient.toLowerCase().includes(search)) {
            visibility = false;
        } else if (!recipe.description.toLowerCase().includes(search)) {
            visibility = false;
        } else if (!recipe.name.toLowerCase().includes(search)) {
            visibility = false;
        } else {
            visibility = true;
        }
    });

    return visibility;
}

export default mainSearchChecker; */