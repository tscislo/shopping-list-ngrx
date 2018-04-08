import {API_ACTIONS} from "./apiActions.enum";
import {ENDPOINT_STATES} from "./endpointStates.enum";
import {ApiAction} from "./apiAction.interface";


export function apiReducer(state = {}, action: ApiAction) {
    switch (action.type) {
        case API_ACTIONS.SYNC_GO:
            return {
                isLoading: true,
                endpoint: {
                    sync: ENDPOINT_STATES.IN_PROGRESS
                }
            }
        case API_ACTIONS.SYNC_SUCCESS:
            return {
                isLoading: false,
                endpoint: {
                    sync: ENDPOINT_STATES.SUCCESS
                }
            }
        case API_ACTIONS.SYNC_ERROR:
            return {
                isLoading: false,
                endpoint: {
                    sync: ENDPOINT_STATES.ERROR
                }
            }
        default:
            return state;
    }
}