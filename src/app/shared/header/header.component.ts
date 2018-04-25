import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StoreManagementService} from '../../core/store-management.service';
import {AppState} from '../../appState.interface';
import {Store} from '@ngrx/store';
import {API_ACTIONS} from '../../apiActions.enum';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() sideMenu = new EventEmitter();
    public warning: Observable<boolean>;

    constructor(public storeManagementService: StoreManagementService,
                public router: Router,
                private store: Store<AppState>,
                private snackBar: MatSnackBar
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

}
