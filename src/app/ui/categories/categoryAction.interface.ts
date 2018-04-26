import {CATEGORY_ACTIONS} from "./categoryActions.enum";


export interface CategoryAction {
    type: CATEGORY_ACTIONS;
    payload?: any;
}
