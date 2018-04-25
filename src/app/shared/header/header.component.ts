import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StoreManagementService} from '../../core/store-management.service';
import {AppState} from '../../appState.interface';
import {Store} from '@ngrx/store';
import {API_ACTIONS} from '../../apiActions.enum';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';
import {PRODUCT_ACTIONS} from "../../productActions.enum";
import {ModalsService} from "../../core/modals.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() sideMenu = new EventEmitter();
    public warning: Observable<boolean>;

    constructor(
                public router: Router,
                private store: Store<AppState>,
                private snackBar: MatSnackBar,
                private modalsService: ModalsService
    ) {
    }

    ngOnInit() {
        this.warning = this.store.select((state: AppState) => state.api.isError);
    }

    // public undo() {
    //     this.storeManagementService.undo();
    // }

    public back() {
        this.router.navigate(['/']);
    }

    public isInRoot = () => this.router.isActive('/', true);

    public showErrorSnackBar() {
        this.snackBar.open(
            'There was some problem with the cloud. Don\'t worry this app can work offline!',
            'Dismiss',
            {
                duration: 5000
            }
        );
    }

    public unBuy = () => {
        this.modalsService.showConfirmation({
            title: 'Confirmation',
            question: `Are you sure you want to mark ALL products as unbought?`
        }).afterClosed().subscribe((result) => {
            if (result) {
                this.store.dispatch({
                    type: PRODUCT_ACTIONS.UNBUY_ALL_PRODUCTS
                })
            }
        });
    }

}
