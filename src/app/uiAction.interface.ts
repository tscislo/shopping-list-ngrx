import {API_ACTIONS} from './apiActions.enum';
import {UI_ACTIONS} from './uiActions.enum';


export interface UiAction {
    type: UI_ACTIONS;
    payload?: any;
}
