import DOM from "../modules/dom.js";
import Error from "./Error.js";

export default class ErrorFactory {    
    static createError = (error) => {
        const item = new Error(error.message, '#FFFF', '#ED6454');
        DOM.append(item.view(), document.body);
    }
}
