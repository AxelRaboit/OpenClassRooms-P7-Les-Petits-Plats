import DOM from "./modules/dom.js";
import Api from "./class/Api.js";
import Recipe from "./class/Recipe.js";

try {
    await Api.init();

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