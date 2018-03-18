import {PRODUCT_ACTIONS} from "../actions/productActions.enum";
import {ProductAction} from "../interfaces/productAction.interface";
import {Product} from "../interfaces/product.interface";
import {quantityReducer} from "./quantity.reducer";


export function productReducer(state: Product[] = [], action: ProductAction) {
    switch (action.type) {
        case PRODUCT_ACTIONS.ADD_PRODUCT:
            return [
                ...state,
                {...action.payload}
            ]

        case PRODUCT_ACTIONS.REMOVE_PRODUCT:
            return state.filter((product: Product) => product.id !== action.payload.id);

        case PRODUCT_ACTIONS.BUY:
            return state.map((product: Product) => {
                if (product.id === action.payload.id) {
                    product.bought = !product.bought
                }
                return product;
            })

        case PRODUCT_ACTIONS.QUANTITY_MINUS:
        case PRODUCT_ACTIONS.QUANTITY_PLUS:
            return state.map((product) => quantityReducer(product, action))


        default:
            return state;
    }
}