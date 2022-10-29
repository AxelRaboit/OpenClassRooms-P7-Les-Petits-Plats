import DOM from "../modules/dom.js";
import Error from "./Error.js";

export default class ErrorFactory {    
    static createError = (error) => {
        let item = new Error(error.message);
        DOM.append(item.view(), document.body);
    }
}
