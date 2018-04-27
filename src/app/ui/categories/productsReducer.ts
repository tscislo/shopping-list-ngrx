
import {ProductAction} from './productAction.interface';
import {Product} from './product.interface';
import {quantityReducer} from './quantity.reducer';
import {PRODUCT_ACTIONS} from './productActions.enum';

export function productsReducer(state: Product[] = [], action: ProductAction) {
    switch (action.type) {
        case PRODUCT_ACTIONS.ADD_PRODUCT:
            return [
                ...state,
                {...action.payload.product}
            ];

        case PRODUCT_ACTIONS.REMOVE_PRODUCT:
            return state.filter((product: Product) => product.id !== action.payload.product.id);

        case PRODUCT_ACTIONS.EDIT:
            return state.map((product: Product) => {
                let newProduct = {...product};
                if (newProduct.id === action.payload.product.id) {
                    newProduct = action.payload.product;
                }
                return newProduct;
            });

        case PRODUCT_ACTIONS.BUY:
            return state.map((product: Product) => {
                const newProduct = {...product};
                if (newProduct.id === action.payload.product.id) {
                    newProduct.bought = !newProduct.bought;
                }
                return newProduct;
            });

        case PRODUCT_ACTIONS.UNBUY_ALL_PRODUCTS:
            return state.map((product: Product) => {
                const newProduct = {...product};
                newProduct.bought = false;
                return newProduct;
            });

        case PRODUCT_ACTIONS.GET_FORM_FIREBASE:
            return action.payload.products;

        case PRODUCT_ACTIONS.QUANTITY_MINUS:
        case PRODUCT_ACTIONS.QUANTITY_PLUS:
            return state.map((product) => quantityReducer(product, action));


        default:
            return state;
    }
}
