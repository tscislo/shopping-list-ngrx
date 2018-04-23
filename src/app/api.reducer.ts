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
                isError: state.isError,
                firebase: {
                    listId: action.payload
                }
            };
        case API_ACTIONS.FIREBASE_SUCCESS:
            return {
                isError: false,
                firebase: {
                    listId: state.firebase.listId
                }
            };
        case API_ACTIONS.FIREBASE_ERROR:
            return {
                isError: true,
                firebase: {
                    listId: state.firebase.listId
                }
            };
        case API_ACTIONS.FIREBASE_LIST_ID_CHANGED:
            return {
                isError: state.isError,
                firebase: {
                    listId: action.payload
                }
            };
        default:
            return state;
    }
}
