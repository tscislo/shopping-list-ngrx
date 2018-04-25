import {API_ACTIONS} from './apiActions.enum';
import {ApiAction} from './apiAction.interface';
import {Api} from './api.interface';

const initialState: Api = {
    isError: false,
    firebase: {
        listId: null
    }
};

export function apiReducer(state = initialState, action: ApiAction) {
    const newState = {...state};
    switch (action.type) {
        case API_ACTIONS.FIREBASE_CREATE_NEW_LIST:
            return {
                isError: newState.isError,
                firebase: {
                    listId: action.payload
                }
            };
        case API_ACTIONS.FIREBASE_SUCCESS:
            return {
                isError: false,
                firebase: {
                    listId: newState.firebase.listId
                }
            };
        case API_ACTIONS.FIREBASE_ERROR:
            return {
                isError: true,
                firebase: {
                    listId: newState.firebase.listId
                }
            };
        case API_ACTIONS.FIREBASE_LIST_ID_CHANGED:
            return {
                isError: newState.isError,
                firebase: {
                    listId: action.payload
                }
            };
        default:
            return state;
    }
}
