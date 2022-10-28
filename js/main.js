import Api from "./class/Api.js";
import FilterDropdownFactory from "./class/FilterDropdownFactory.js";
import RecipeFactory from "./class/RecipeFactory.js";
import ErrorFactory from "./class/ErrorFactory.js";

try {
    await Api.init();
    FilterDropdownFactory.createDropdowns();
    RecipeFactory.createRecipes();

} catch (err) {
    ErrorFactory.createError(err);
}