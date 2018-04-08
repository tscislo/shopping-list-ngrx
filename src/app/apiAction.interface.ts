import {API_ACTIONS} from "./apiActions.enum";


export interface ApiAction {
    type: API_ACTIONS;
    payload?: any;
}