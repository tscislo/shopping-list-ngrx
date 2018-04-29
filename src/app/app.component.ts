import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/take';
import {AppState} from './appState.interface';
import {Store} from '@ngrx/store';
import {API_ACTIONS} from './apiActions.enum';
import {StoreManagementService} from './core/store-management.service';
import {MatSidenav} from '@angular/material';
import {UI_ACTIONS} from './uiActions.enum';
import {FirebaseSyncService} from './core/firebase-sync.service';

@Component({
    selector: 'app-root',
    template: `
        <mat-sidenav-container class="sidenav-container">
            <mat-sidenav mode="over" class="sidenav">
                <mat-form-field>
                    <input name="listId" type="text"
                           matInput
                           [errorStateMatcher]="errorMatcher"
                           (blur)="listIdChanged()"
                           [(ngModel)]="listId">
                    <mat-error>
                        List number must have at least 8 characters
                    </mat-error>
                    <mat-icon matSuffix>mode_edit</mat-icon>
                </mat-form-field>
            </mat-sidenav>
            <mat-sidenav-content>
                <router-outlet></router-outlet>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `,
    styles: [
            `
            .sidenav-container {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }

            .sidenav {
                min-width: 40%;
                margin-top: 56px;
                padding: 0px 10px;
            }
        `
    ]
})
export class AppComponent implements OnInit {

    public listId: string;
    public errorMatcher = {
        isErrorState: () => {
        }
    };

    @ViewChild(MatSidenav) matSidenav: MatSidenav;

    constructor(private store: Store<AppState>,
                private storeManagement: StoreManagementService,
                private firebaseSyncService: FirebaseSyncService
    ) {
        this.errorMatcher.isErrorState = () => !this.isListIdValid();
        document.addEventListener('backbutton', () => {
            window.close();
        }, false);
    }

    ngOnInit() {
        this.store
            .select((state) => state.api.firebase.listId)
            .subscribe((listId) => {
                if (!listId) {
                    this.store.dispatch({
                        type: API_ACTIONS.FIREBASE_CREATE_NEW_LIST,
                        payload: this.storeManagement.generateId()
                    });
                } else {
                    this.listId = listId;
                }
            });

        this.firebaseSyncService.syncCategories();

        this.store
            .select((state) => state.ui.sidenav)
            .subscribe((sidenav) => this.matSidenav.toggle(sidenav && !this.matSidenav.opened));

        this.matSidenav.onOpen.subscribe(() => {
            this.store.dispatch({
                type: UI_ACTIONS.OPEN_NAVBAR
            });
        });

        this.matSidenav.onClose.subscribe(() => {
            this.store.dispatch({
                type: UI_ACTIONS.CLOSE_NAVBAR
            });
        });

    }

    public listIdChanged() {
        if (this.isListIdValid()) {
            this.store.dispatch({
                type: API_ACTIONS.FIREBASE_LIST_ID_CHANGED,
                payload: this.listId
            });
        }
    }

    public isListIdValid = () => this.listId && this.listId.length >= 8;

}
