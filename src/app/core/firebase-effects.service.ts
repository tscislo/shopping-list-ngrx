import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {API_ACTIONS} from '../apiActions.enum';
import {map, switchMap, catchError} from 'rxjs/operators';
import {AngularFirestore} from "angularfire2/firestore";
import {AppState} from "../appState.interface";
import {Product} from "../product.interface";
import {fromPromise} from "rxjs/observable/fromPromise";
import {PRODUCT_ACTIONS} from "../productActions.enum";
import {of} from "rxjs/observable/of";
import * as firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;
import {StoreManagementService} from "./store-management.service";

@Injectable()
export class FirebaseEffectsService {

    @Effect()
    sync$: Observable<Action> = this.actions$.pipe(
        ofType(
            PRODUCT_ACTIONS.ADD_PRODUCT,
            PRODUCT_ACTIONS.QUANTITY_PLUS,
            PRODUCT_ACTIONS.QUANTITY_MINUS,
            PRODUCT_ACTIONS.REMOVE_PRODUCT,
            PRODUCT_ACTIONS.BUY,
            'ngrx-undo/UNDO_ACTION'
        ),
        switchMap(() => this.store.take(1)),
        switchMap((appState: AppState) => fromPromise(
            this.angularFirestore
                .collection('lists')
                .doc(appState.api.firebase.listId)
                .update({products: appState.products}
                ))),
        map(() => {
            return {
                type: API_ACTIONS.FIREBASE_SUCCESS
            }
        }),
        catchError(err => of(
            {
                type: API_ACTIONS.FIREBASE_ERROR
            }
        ))
    );

    @Effect()
    newList$: Observable<Action> = this.actions$.pipe(
        ofType(
            API_ACTIONS.FIREBASE_CREATE_NEW_LIST
        ),
        switchMap(() => {
                const id = this.storeManagement.generateId().toString()
                return fromPromise(
                    this.angularFirestore
                        .collection('lists')
                        .doc(id)
                        .set({})
                        .then(() => id)
                )
            }
        ),
        map((id) => {
            return {
                type: API_ACTIONS.FIREBASE_LIST_ID_CHANGED,
                payload: id
            }
        }),
        catchError(err => of(
            {
                type: API_ACTIONS.FIREBASE_ERROR
            }
        ))
    );

    constructor(private actions$: Actions<Action>,
                private store: Store<AppState>,
                private angularFirestore: AngularFirestore,
                private storeManagement: StoreManagementService
    ) {
    }

}
