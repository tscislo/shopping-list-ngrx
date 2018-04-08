import {Product} from "./product.interface";
import {Filters} from "./filters.interface";

export interface AppState {
    list : {
        products: Product[],
        filters: Filters
    }
};
