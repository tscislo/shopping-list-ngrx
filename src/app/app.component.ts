import {Component} from '@angular/core';
import 'rxjs/add/operator/take';
import {AppState} from "./appState.interface";
import {Store} from "@ngrx/store";
import {PRODUCT_ACTIONS} from "./productActions.enum";
import {API_ACTIONS} from "./apiActions.enum";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-root',
    template: `
        <app-header (sideMenu)="sidenav.toggle()"></app-header>
        <mat-sidenav-container class="sidenav-container">
            <mat-sidenav #sidenav mode="over" class="sidenav">
                <mat-list role="list">
                    <mat-list-item role="listitem">
                        <mat-form-field>
                            <input name="listId" type="text"
                                   matInput
                                   (blur)="listIdChanged()"
                                   [(ngModel)]="listId"> 
                            <mat-icon matSuffix>mode_edit</mat-icon>
                        </mat-form-field>
                    </mat-list-item>
                </mat-list>
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
            }
        `
    ]
})
export class AppComponent {

    public listId: string;

    constructor(private store: Store<AppState>) {

    }

    ngOnInit() {
        this.store.select((state) => state.api.firebase)
            .take(1)
            .subscribe((firebase) => {
                if (!(firebase && firebase.listId)) {
                    this.store.dispatch({
                        type: API_ACTIONS.FIREBASE_CREATE_NEW_LIST
                    })
                }
            })
        this.store.select((state) => state.api.firebase.listId).subscribe((listId) => {
            this.listId = listId
        })
    }

    public listIdChanged() {
        this.store.dispatch({
            type: API_ACTIONS.FIREBASE_LIST_ID_CHANGED,
            payload: this.listId
        })
    }

}
