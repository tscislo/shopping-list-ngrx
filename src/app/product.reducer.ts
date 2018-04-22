
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
                const newProduct = {...product};
                if (newProduct.id === action.payload.id) {
                    newProduct.bought = !newProduct.bought;
                }
                return newProduct;
            });

        case PRODUCT_ACTIONS.GET_PRODUCTS_FROM_FIREBASE:
            return action.payload;

        case PRODUCT_ACTIONS.QUANTITY_MINUS:
        case PRODUCT_ACTIONS.QUANTITY_PLUS:
            return state.map((product) => quantityReducer(product, action));


        default:
            return state;
    }
}
