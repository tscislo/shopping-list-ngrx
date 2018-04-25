import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/take';
import {AppState} from './appState.interface';
import {Store} from '@ngrx/store';
import {API_ACTIONS} from './apiActions.enum';
import {StoreManagementService} from './core/store-management.service';

@Component({
    selector: 'app-root',
    template: `
        <app-header (sideMenu)="sidenav.toggle()"></app-header>
        <mat-sidenav-container class="sidenav-container">
            <mat-sidenav #sidenav mode="over" class="sidenav">
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

    constructor(private store: Store<AppState>,
                private storeManagement: StoreManagementService
    ) {
        this.errorMatcher.isErrorState = () => !this.isListIdValid();
        document.addEventListener("backbutton", () => {
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
