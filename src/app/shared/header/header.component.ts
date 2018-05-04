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
import {environment} from '../../../environments/environment';
import {ENV_TYPES} from '../../../environments/envTypes.enum';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() sideMenu = new EventEmitter();
    @Input() title;
    public warning: Observable<boolean>;
    public isAndroid = environment.type === ENV_TYPES.ANDROID;

    constructor(public router: Router,
                private store: Store<AppState>,
                private snackBar: MatSnackBar,
                private modalService: ModalsService) {
    }

    ngOnInit() {
        this.warning = this.store.select((state: AppState) => state.api.isError);
    }


    public exit() {
        this.modalService.showConfirmation({
            title: 'Confirmation',
            question: `Are you sure you want to exit?`
        }).afterClosed().subscribe((result) => {
            if (result) {
                navigator['app'].exitApp();
            }
        });
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
