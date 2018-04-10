import {ENDPOINT_STATES} from './endpointStates.enum';

export interface Api {
    isLoading: boolean;
    endpoint: {
        sync: ENDPOINT_STATES
    };
}
