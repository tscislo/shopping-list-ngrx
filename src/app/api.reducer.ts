import {API_ACTIONS} from './apiActions.enum';
import {ApiAction} from './apiAction.interface';
import {Api} from './api.interface';

const initialState: Api = {
    isError: false,
    firebase: {
        listId: null,
        pin: null
    }
};

export function apiReducer(state = initialState, action: ApiAction) {
    const newState = {...state};
    switch (action.type) {
        case API_ACTIONS.FIREBASE_CREATE_NEW_LIST:
            return {
                isError: newState.isError,
                firebase: action.payload
            };
        case API_ACTIONS.FIREBASE_SUCCESS:
            return {
                isError: false,
                firebase: newState.firebase
            };
        case API_ACTIONS.FIREBASE_ERROR:
            return {
                isError: true,
                firebase: newState.firebase
            };
        case API_ACTIONS.FIREBASE_LIST_ID_CHANGED:
            return {
                isError: newState.isError,
                firebase: action.payload
            };
        case API_ACTIONS.FIREBASE_LIST_ID_NOT_CHANGED:
            return {
                isError: newState.isError,
                firebase: newState.firebase
            };
        default:
            return state;
    }
}
