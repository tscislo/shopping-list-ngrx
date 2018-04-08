import {PRODUCT_ACTIONS} from "./productActions.enum";


export interface ProductAction {
    type: PRODUCT_ACTIONS;
    payload?: any;
}