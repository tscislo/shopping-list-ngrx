import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/take';
import {AppState} from './appState.interface';
import {Store} from '@ngrx/store';
import {API_ACTIONS} from './apiActions.enum';
import {StoreManagementService} from './core/store-management.service';
import {MatSidenav} from '@angular/material';
import {UI_ACTIONS} from './uiActions.enum';
import {FirebaseSyncService} from './core/firebase-sync.service';
import {CordovaService} from './core/cordova.service';

@Component({
    selector: 'app-root',
    template: `
        <mat-sidenav-container class="sidenav-container">
            <mat-sidenav mode="over" class="sidenav">
                <mat-form-field>
                    <input name="listId"
                           matInput
                           placeholder="List number"
                           [errorStateMatcher]="listIdErrorMatcher"
                           [(ngModel)]="listId">
                    <mat-error>
                        Must be 8 characters long!
                    </mat-error>
                    <mat-icon matSuffix>mode_edit</mat-icon>
                </mat-form-field>
                <mat-form-field>
                    <input name="pin"
                           matInput
                           placeholder="List PIN"
                           [errorStateMatcher]="pinErrorMatcher"
                           [(ngModel)]="pin">
                    <mat-error>
                        Must be 4 characters long!
                    </mat-error>
                    <mat-icon matSuffix>mode_edit</mat-icon>
                </mat-form-field>
                <button mat-raised-button
                        [disabled]="!isPINValid() || !isListIdValid() || (!isListIdDifferentThenCurrent() && !isPINDifferentThenCurrent())"
                        color="primary"
                        (click)="listIdChanged()"
                        class="save">Save
                </button>
                <button mat-raised-button
                        (click)="createNewList()"
                        class="save">Create new list
                </button>
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
                width: 225px;
                margin-top: 56px;
                padding: 10px 10px;
            }

            .save {
                margin-top: 10px
            }

        `
    ]
})
export class AppComponent implements OnInit {

    public listId: string;
    public pin: string;
    public listIdErrorMatcher = {
        isErrorState: () => {
        }
    };
    public pinErrorMatcher = {
        isErrorState: () => {
        }
    };

    @ViewChild(MatSidenav) matSidenav: MatSidenav;

    constructor(private store: Store<AppState>,
                private storeManagement: StoreManagementService,
                private firebaseSyncService: FirebaseSyncService,
                private cordovaService: CordovaService // not used on purpose
    ) {
        this.listIdErrorMatcher.isErrorState = () => !this.isListIdValid();
        this.pinErrorMatcher.isErrorState = () => !this.isPINValid();
    }

    ngOnInit() {
        this.store
            .select((state) => state.api.firebase)
            .subscribe((firebase) => {
                if (!firebase.listId) {
                    this.createNewList();
                } else {
                    this.listId = firebase.listId;
                    this.pin = firebase.pin;
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

        this.matSidenav.openedStart.subscribe(() => {
            this.store
                .select((state) => state.api.firebase)
                .take(1)
                .subscribe((firebase) => {
                    this.listId = firebase.listId;
                    this.pin = firebase.pin;
                });
        });

        this.matSidenav.onClose.subscribe(() => {
            this.store.dispatch({
                type: UI_ACTIONS.CLOSE_NAVBAR
            });
        });


    }

    public listIdChanged() {
        if (this.isListIdValid()
            && this.isPINValid()
            && (this.isListIdDifferentThenCurrent()
                || this.isPINDifferentThenCurrent())) {
            this.store.dispatch({
                type: API_ACTIONS.FIREBASE_LIST_ID_CHANGE_INIT,
                payload: {
                    listId: this.listId,
                    pin: this.pin
                }
            });
            this.store.dispatch(
                {
                    type: UI_ACTIONS.CLOSE_NAVBAR
                }
            );
        }
    }

    public isListIdValid = () => this.listId && this.listId.toString().length === 8;

    public isPINValid = () => this.pin && this.pin.toString().length === 4;

    public isPINDifferentThenCurrent() {
        let pinCurrent;
        this.store
            .select((state) => state.api.firebase.pin)
            .take(1)
            .subscribe((pin) => pinCurrent = pin);
        return pinCurrent !== this.pin.toString();
    }

    public isListIdDifferentThenCurrent() {
        let listIdCurrent;
        this.store
            .select((state) => state.api.firebase.listId)
            .take(1)
            .subscribe((listId) => listIdCurrent = listId);
        return listIdCurrent !== this.listId.toString();
    }

    public createNewList() {
        this.store.dispatch({
            type: API_ACTIONS.FIREBASE_CREATE_NEW_LIST,
            payload:
                {
                    listId: this.storeManagement.generateId(),
                    pin: this.storeManagement.generateId(4)
                }
        });
    }

}
