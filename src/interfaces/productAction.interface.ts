import {PRODUCT_ACTIONS} from "../actions/productActions.enum";

export interface ProductAction {
    type: PRODUCT_ACTIONS;
    payload?: any;
}