import {UI_ACTIONS} from "./uiActions.enum";
import {UiAction} from "./uiAction.interface";

const initialState = {
    sidenav: false
};

export function uiReducer(state = initialState, action: UiAction) {
    switch (action.type) {
        case UI_ACTIONS.TOGGLE_NAVBAR:
            return {
                sidenav: !state.sidenav
            };
        case UI_ACTIONS.OPEN_NAVBAR:
            return {
                sidenav: true
            };
        case UI_ACTIONS.CLOSE_NAVBAR:
            return {
                sidenav: false
            };
        default:
            return state;
    }
}
