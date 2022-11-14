const searchByMainInput = (recipe, visible) => {

    // Get the main search input
    const searchBar = document.getElementById('main-search__input');

    // Get the value of the search input if the value length is greater or equal than 3 or return null
    const search = (searchBar.value.length >= 3) ? searchBar.value.toLowerCase() : null;

    // If the user type on the main search bar and it's superior or egal to 3 characters
    if (search) {
        recipe.ingredients.forEach(current => {
            if (!current.ingredient.toLowerCase().includes(search)
            && !recipe.description.toLowerCase().includes(search)
            && !recipe.name.toLowerCase().includes(search)) {
                visible = false;
            }
        });
    }

    return visible;
}

export default searchByMainInput;