import {ApiAction} from './apiAction.interface';
import {UI_ACTIONS} from "./uiActions.enum";

const initialState = {
    sidenav: false
};

export function uiReducer(state = initialState, action: ApiAction) {
    switch (action.type) {
        case UI_ACTIONS.TOGGLE_NAVBAR:
            return {
                sidenav: !state.sidenav
            };
        default:
            return state;
    }
}
