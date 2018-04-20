import {Product} from './product.interface';
import {Filters} from './ui/list/filters.interface';
import {ENDPOINT_STATES} from './endpointStates.enum';


export interface AppState {
    api: {
        isLoading: boolean,
        endpoint: {
            sync: ENDPOINT_STATES
        }
    };
    firebase: {
        listId: string
    },
    products: Product[];
    list: {
        filters: Filters
    };
}
