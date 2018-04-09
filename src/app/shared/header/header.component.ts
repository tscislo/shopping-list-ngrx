import {Component, OnInit} from '@angular/core';
import {StoreManagementService} from "../../core/store-management.service";
import {AppState} from "../../appState.interface";
import {Store} from "@ngrx/store";
import {API_ACTIONS} from "../../apiActions.enum";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isLoading$;

    constructor(public storeManagementService: StoreManagementService,
                private store: Store<AppState>
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.store.select((state) => state.api.isLoading);
    }

    public undo() {
        this.storeManagementService.undo();
    }

    public sync() {
        this.store.dispatch({
            type: API_ACTIONS.SYNC_GO
        })
    }

}
