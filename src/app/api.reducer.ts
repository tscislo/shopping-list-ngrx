import {API_ACTIONS} from './apiActions.enum';
import {ENDPOINT_STATES} from './endpointStates.enum';
import {ApiAction} from './apiAction.interface';
import {Api} from './api.interface';

const initialState: Api = {
    isLoading: false,
    endpoint: {
        sync: ENDPOINT_STATES.IDLE
    },
    firebase: {
        listId: null
    }
};

export function apiReducer(state = initialState, action: ApiAction) {
    switch (action.type) {
        case API_ACTIONS.FIREBASE_SYNC:
            return {
                isLoading: true,
                endpoint: {
                    sync: ENDPOINT_STATES.IN_PROGRESS
                },
                firebase: {
                    listId: state.firebase.listId
                }
            };
        case API_ACTIONS.FIREBASE_SUCCESS:
            return {
                isLoading: false,
                endpoint: {
                    sync: ENDPOINT_STATES.SUCCESS
                },
                firebase: {
                    listId: state.firebase.listId
                }
            };
        case API_ACTIONS.FIREBASE_ERROR:
            return {
                isLoading: false,
                endpoint: {
                    sync: ENDPOINT_STATES.ERROR
                },
                firebase: {
                    listId: state.firebase.listId
                }
            };
        case API_ACTIONS.FIREBASE_LIST_ID_CHANGED:
            return {
                isLoading: false,
                endpoint: {
                    sync: ENDPOINT_STATES.ERROR
                },
                firebase: {
                    listId: action.payload
                }
            };
        default:
            return state;
    }
}
