import {FILTER_ACTIONS} from "./filterActions.enum";


export interface FilterAction {
    type: FILTER_ACTIONS;
    payload?: any;
}