import Api from "./class/Api.js";
import FilterDropdown from "./class/FilterDropdown.js";
import RecipeFactory from "./class/RecipeFactory.js";
import ErrorFactory from "./class/ErrorFactory.js";

try {
    await Api.init();
    FilterDropdown.createDropdowns();
    RecipeFactory.createRecipes();

} catch (err) {
    ErrorFactory.createError(err);
}