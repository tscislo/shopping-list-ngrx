import {RouterStateSerializer} from '@ngrx/router-store';
import {RouterStateSnapshot} from '@angular/router';

interface MyRouterState {
    url: string;
    queryParams: any;
}

export class RouterSerializer implements RouterStateSerializer<MyRouterState> {
    serialize(routerState: RouterStateSnapshot) {

        return<MyRouterState> {
            url: routerState.url,
            queryParams: routerState.root.queryParams
        };
    }
}
