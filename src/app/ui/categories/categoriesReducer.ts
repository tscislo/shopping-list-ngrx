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
                let newCategory: any = {...category};
                if (newCategory.id === action.payload.id) {
                    newCategory = action.payload;
                }
                return newCategory;
            });
        case CATEGORY_ACTIONS.GET_FORM_FIREBASE:
            return (action.payload as any)
                .map((category: Category) => {
                    // products not used intentionally
                    const {products, ...rest} = category;
                    // get products from existing state
                    const categoryFromState: Category = state.find((categoryFromState: Category) => categoryFromState.id === category.id);
                    return {
                        ...rest,
                        products: (categoryFromState) ? categoryFromState.products : []
                    }
                })
        // PRODUCT related actions, as products are inside category
        case PRODUCT_ACTIONS.ADD_PRODUCT:
        case PRODUCT_ACTIONS.REMOVE_PRODUCT:
        case PRODUCT_ACTIONS.EDIT:
        case PRODUCT_ACTIONS.BUY:
        case PRODUCT_ACTIONS.UNBUY_ALL_PRODUCTS:
        case PRODUCT_ACTIONS.GET_FORM_FIREBASE:
        case PRODUCT_ACTIONS.QUANTITY_MINUS:
        case PRODUCT_ACTIONS.QUANTITY_PLUS:
            return state.map((category: Category) => {
                const {products, ...rest} = category;
                return {
                    products: (action.payload.categoryId === category.id) ? productsReducer(products, action) : products,
                    ...rest
                }
            });

        default:
            return state;
    }
}
