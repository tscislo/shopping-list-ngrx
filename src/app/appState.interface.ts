import {Api} from './api.interface';
import {Category} from "./ui/categories/category.intefrace";


export interface AppState {
    api: Api;
    categories: Category[];
}
