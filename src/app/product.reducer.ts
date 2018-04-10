
import {ProductAction} from './productAction.interface';
import {Product} from './product.interface';
import {quantityReducer} from './quantity.reducer';
import {PRODUCT_ACTIONS} from './productActions.enum';


export function productReducer(state: Product[] = [], action: ProductAction) {
    switch (action.type) {
        case PRODUCT_ACTIONS.ADD_PRODUCT:
            return [
                ...state,
                {...action.payload}
            ];

        case PRODUCT_ACTIONS.REMOVE_PRODUCT:
            return state.filter((product: Product) => product.id !== action.payload.id);

        case PRODUCT_ACTIONS.BUY:
            return state.map((product: Product) => {
                if (product.id === action.payload.id) {
                    product.bought = !product.bought;
                }
                return product;
            });

        case PRODUCT_ACTIONS.QUANTITY_MINUS:
        case PRODUCT_ACTIONS.QUANTITY_PLUS:
            return state.map((product) => quantityReducer(product, action));


        default:
            return state;
    }
}
