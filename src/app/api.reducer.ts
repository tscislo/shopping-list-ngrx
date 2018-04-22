import {API_ACTIONS} from './apiActions.enum';
import {ApiAction} from './apiAction.interface';
import {Api} from './api.interface';

const initialState: Api = {
    isLoading: false,
    firebase: {
        listId: null
    }
};

export function apiReducer(state = initialState, action: ApiAction) {
    switch (action.type) {
        case API_ACTIONS.FIREBASE_CREATE_NEW_LIST:
            return {
                isLoading: true,
                firebase: {
                    listId: state.firebase.listId
                }
            };
        case API_ACTIONS.FIREBASE_SUCCESS:
        case API_ACTIONS.FIREBASE_ERROR:
            return {
                isLoading: false,
                firebase: {
                    listId: state.firebase.listId
                }
            };
        case API_ACTIONS.FIREBASE_LIST_ID_CHANGED:
            return {
                isLoading: false,
                firebase: {
                    listId: action.payload
                }
            };
        default:
            return state;
    }
}
