import {CATEGORY_ACTIONS} from "./categoryActions.enum";
import {Category} from "./category.intefrace";


export interface CategoryAction {
    type: CATEGORY_ACTIONS;
    payload?: Category;
}
