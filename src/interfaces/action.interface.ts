import {PRODUCT_ACTIONS} from "../actions/actions.enum";

export interface ProductAction {
    type: PRODUCT_ACTIONS;
    payload?: any;
}