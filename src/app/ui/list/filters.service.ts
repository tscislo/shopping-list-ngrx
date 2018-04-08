import {Injectable} from '@angular/core';
import {Filters} from "./filters.interface";

@Injectable()
export class FiltersService {

    public filters = {
        ONLY_BOUGHT: (product) => product.bought,
        ALL: (product) => true
    }

    constructor() {
    }

    public get(filtersState: Filters) {
        if(filtersState.bought) {
            return this.filters.ONLY_BOUGHT
        } else {
            return this.filters.ALL
        }

    }

}
