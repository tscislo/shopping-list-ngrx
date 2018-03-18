import {ProductAction} from "../interfaces/action.interface";
import {PRODUCT_ACTIONS} from "../actions/actions.enum";
import {Product} from "../interfaces/product.interface";

export function quantityReducer(state: Product, action: ProductAction) {
    const newState = {...state};
    if (state.id === action.payload.id) {
        switch (action.type) {
            case PRODUCT_ACTIONS.QUANTITY_PLUS:
                ++newState.quantity;
                break;
            case PRODUCT_ACTIONS.QUANTITY_MINUS:
                if (newState.quantity - 1 >= 0) {
                    --newState.quantity;
                }
                break;
        }
    }
    return newState;
}