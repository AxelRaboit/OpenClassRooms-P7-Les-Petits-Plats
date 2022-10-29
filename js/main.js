import Api from "./class/Api.js";
import FilterDropdownFactory from "./class/FilterDropdownFactory.js";
import RecipeFactory from "./class/RecipeFactory.js";
import MessageFactory from './class/MessageFactory.js';

try {
    await Api.init();
    FilterDropdownFactory.createDropdowns();
    RecipeFactory.createRecipes();

} catch (err) {
    MessageFactory.createError(err.message, document.body);
}
