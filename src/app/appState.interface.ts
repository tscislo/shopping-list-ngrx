import {Product} from './product.interface';
import {Filters} from './ui/products/filters.interface';
import {Api} from './api.interface';


export interface AppState {
    api: Api;
    products: Product[];
    list: {
        filters: Filters
    };
}
