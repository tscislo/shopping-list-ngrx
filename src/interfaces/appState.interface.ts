import {Product} from "./product.interface";
import {Filters} from "./filters.interface";

export interface AppState {
    products: Product[],
    filters: Filters
};
