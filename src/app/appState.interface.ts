import {Product} from "./product.interface";
import {Filters} from "./ui/list/filters.interface";


export interface AppState {
    products: Product[],
    list : {
        filters: Filters
    }
};
