import {Category} from "./category.intefrace";
import {CategoryAction} from "./categoryAction.interface";
import {CATEGORY_ACTIONS} from "./categoryActions.enum";
import {ProductAction} from "./productAction.interface";
import {PRODUCT_ACTIONS} from "./productActions.enum";
import {productsReducer} from "./productsReducer";

export function categoriesReducer(state: Category[] = [], action: CategoryAction | ProductAction) {
    switch (action.type) {
        case CATEGORY_ACTIONS.ADD:
            return [
                ...state,
                {...action.payload}
            ];

        case CATEGORY_ACTIONS.REMOVE:
            return state.filter((category: Category) => category.id !== action.payload.id);

        case CATEGORY_ACTIONS.EDIT:
            return state.map((category: Category) => {
                let newProduct = {...category};
                if (newProduct.id === action.payload.id) {
                    newProduct = action.payload;
                }
                return newProduct;
            });

        case PRODUCT_ACTIONS.ADD_PRODUCT:
        case PRODUCT_ACTIONS.REMOVE_PRODUCT:
        case PRODUCT_ACTIONS.EDIT:
        case PRODUCT_ACTIONS.BUY:
        case PRODUCT_ACTIONS.UNBUY_ALL_PRODUCTS:
        case PRODUCT_ACTIONS.GET_PRODUCTS_FROM_FIREBASE:
        case PRODUCT_ACTIONS.QUANTITY_MINUS:
        case PRODUCT_ACTIONS.QUANTITY_PLUS:
            return state.map((category) => {
                const {products, ...rest} = category;
                return {
                    products: (action.payload.categoryId === category.id) ?  productsReducer(products, action) : products,
                    ...rest
                }
            });

        default:
            return state;
    }
}
