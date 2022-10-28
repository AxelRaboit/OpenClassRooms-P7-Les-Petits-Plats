export default class Api {
    static recipes = [];
    static allIngredients = [];

    static init = async () => {
        const req = await fetch('recipes.json');
        if (!req.ok) {
            throw new Error('Could not fetch data');
        }
        const data = await req.json();
        Api.recipes = data.recipes;
        console.log(Api.recipes);
    }

    /**
     * Retreive all ingredients from recipes
     * @returns {Array} Array of all ingredients
     */
    static getAllIngredients = () => {
        Api.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if (!Api.allIngredients.includes(ingredient.ingredient)) {
                    Api.allIngredients = [...Api.allIngredients, ingredient];
                }
            });
        });
        return Api.allIngredients;
    }

    /*
     * Retreive all existing recipes
    */
    static getAllRecipes = () => {
        return Api.recipes;
    }
}
