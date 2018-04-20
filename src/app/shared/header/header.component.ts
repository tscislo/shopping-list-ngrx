import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StoreManagementService} from '../../core/store-management.service';
import {AppState} from '../../appState.interface';
import {Store} from '@ngrx/store';
import {API_ACTIONS} from '../../apiActions.enum';
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() sideMenu = new EventEmitter()
    public isLoading$;

    constructor(public storeManagementService: StoreManagementService,
                public router: Router,
                private store: Store<AppState>
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.store.select((state) => state.api.isLoading);
    }

    public undo() {
        this.storeManagementService.undo();
    }

    // Not used
    // public sync() {
    //     this.store.dispatch({
    //         type: API_ACTIONS.FIREBASE_SYNC
    //     });
    // }

    public back() {
        this.router.navigate(['/']);
    }

    public isInRoot = () => this.router.isActive('/', true);

}
