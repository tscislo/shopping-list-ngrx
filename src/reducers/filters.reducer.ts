import {Filters} from "../interfaces/filters.interface";
import {FilterAction} from "../interfaces/filterAction.interface";
import {FILTER_ACTIONS} from "../actions/filterActions.enum";


export function filtersReducer(state: Filters = {bought: false}, action: FilterAction) {
    const newState = {...state};
    switch (action.type) {
        case FILTER_ACTIONS.SHOW_BOUGHT:
            newState.bought = true;
            break
        case FILTER_ACTIONS.SHOW_ALL:
            newState.bought = false;
            break
    }
    return newState;
}