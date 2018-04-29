import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoreManagementService} from '../../core/store-management.service';
import {AppState} from '../../appState.interface';
import {Store} from '@ngrx/store';
import {API_ACTIONS} from '../../apiActions.enum';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';
import {PRODUCT_ACTIONS} from '../../ui/categories/productActions.enum';
import {ModalsService} from '../../core/modals.service';
import {UI_ACTIONS} from '../../uiActions.enum';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() sideMenu = new EventEmitter();
    @Input() title;
    @Input() showBack;
    public warning: Observable<boolean>;

    constructor(
                public router: Router,
                private store: Store<AppState>,
                private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.warning = this.store.select((state: AppState) => state.api.isError);
    }


    public back() {
        window.history.back();
    }

    public toggleNavbar() {
        this.store.dispatch({
            type: UI_ACTIONS.TOGGLE_NAVBAR
        });
    }

    public showErrorSnackBar() {
        this.snackBar.open(
            'There was some problem with the cloud. Don\'t worry this app can work offline!',
            'Dismiss',
            {
                duration: 5000
            }
        );
    }


}
