import {FILTER_ACTIONS} from "../actions/filterActions.enum";

export interface FilterAction {
    type: FILTER_ACTIONS;
    payload?: any;
}