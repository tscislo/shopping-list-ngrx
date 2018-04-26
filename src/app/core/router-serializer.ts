import {RouterStateSerializer} from '@ngrx/router-store';
import {RouterStateSnapshot} from '@angular/router';

interface MyRouterState {
    url: string;
    previousURL: string;
}

export class RouterSerializer implements RouterStateSerializer<MyRouterState> {

    private urls = [];

    public getPreviousRoute = ()=> (this.urls.length >= 2) ? this.urls[this.urls.length - 2] : null;

    serialize(routerState: RouterStateSnapshot) {
        this.urls.push(routerState.url)
        return<MyRouterState> {
            url: routerState.url,
            previousURL: this.getPreviousRoute()
        };
    }
}
