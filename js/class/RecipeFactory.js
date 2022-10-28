import Api from "./Api.js";
import DOM from "../modules/dom.js";
import Recipe from "./Recipe.js";

export default class RecipeFactory {
    static createRecipes() {
        Api.getAllRecipes().forEach(recipe => {
            let item = new Recipe(recipe);
            DOM.append(item.view(), document.getElementById("recipes-container"));
        });
    }
}