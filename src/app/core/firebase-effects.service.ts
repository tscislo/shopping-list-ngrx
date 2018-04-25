import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {API_ACTIONS} from '../apiActions.enum';
import {map, switchMap, catchError} from 'rxjs/operators';
import "rxjs/operators/take";
import {AngularFirestore} from 'angularfire2/firestore';
import {AppState} from '../appState.interface';
import {Product} from '../product.interface';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {PRODUCT_ACTIONS} from '../productActions.enum';
import {of} from 'rxjs/observable/of';
import {ProductAction} from '../productAction.interface';

@Injectable()
export class FirebaseEffectsService {

    constructor(private actions$: Actions<Action>,
                private store: Store<AppState>,
                private angularFirestore: AngularFirestore
    ) {
    }

    @Effect()
    addProduct$: Observable<Action> = this.actions$.pipe(
        ofType(
            PRODUCT_ACTIONS.ADD_PRODUCT,
        ),
        switchMap((action: ProductAction) => {
            return this.store.select((state: AppState) => state.api.firebase.listId)
                .take(1)
                .pipe(
                    switchMap((listId) =>
                        fromPromise(
                            this.angularFirestore
                                .collection('lists')
                                .doc(listId)
                                .collection('products')
                                .doc(action.payload.id)
                                .set(action.payload)
                        ))
                );
        }),
        map(() => {
            return {
                type: API_ACTIONS.FIREBASE_SUCCESS
            };
        }),
        catchError(err =>
            of({
                type: API_ACTIONS.FIREBASE_ERROR
            })
        )
    );

    @Effect()
    removeProduct$: Observable<Action> = this.actions$.pipe(
        ofType(
            PRODUCT_ACTIONS.REMOVE_PRODUCT,
        ),
        switchMap((action: ProductAction) => {
            return this.store.select((state: AppState) => state.api.firebase.listId)
                .take(1)
                .pipe(
                    switchMap((listId) =>
                        fromPromise(
                            this.angularFirestore
                                .collection('lists')
                                .doc(listId)
                                .collection('products')
                                .doc(action.payload.id)
                                .delete()
                        ))
                );
        }),
        map(() => {
            return {
                type: API_ACTIONS.FIREBASE_SUCCESS
            };
        }),
        catchError(err =>
            of({
                type: API_ACTIONS.FIREBASE_ERROR
            })
        )
    );

    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType(
            PRODUCT_ACTIONS.QUANTITY_MINUS,
            PRODUCT_ACTIONS.QUANTITY_PLUS,
            PRODUCT_ACTIONS.BUY,
            PRODUCT_ACTIONS.EDIT
        ),
        switchMap((action: ProductAction) => {
            return this.store
                .take(1)
                .pipe(
                    switchMap((state) =>
                        fromPromise(
                            this.angularFirestore
                                .collection('lists')
                                .doc(state.api.firebase.listId)
                                .collection('products')
                                .doc(action.payload.id)
                                .set(state.products.find((product: Product) => product.id === action.payload.id))
                        ))
                );
        }),
        map(() => {
            return {
                type: API_ACTIONS.FIREBASE_SUCCESS
            };
        }),
        catchError(err =>
            of({
                type: API_ACTIONS.FIREBASE_ERROR
            })
        )
    );


}
