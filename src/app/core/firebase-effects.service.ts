import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {API_ACTIONS} from '../apiActions.enum';
import {catchError, delay, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {AngularFirestore} from "angularfire2/firestore";
import {AppState} from "../appState.interface";
import {Product} from "../product.interface";
import {fromPromise} from "rxjs/observable/fromPromise";
import {PRODUCT_ACTIONS} from "../productActions.enum";

@Injectable()
export class FirebaseEffectsService {

    @Effect()
    sync$: Observable<Action> = this.actions$.pipe(
        ofType(PRODUCT_ACTIONS.ADD_PRODUCT, PRODUCT_ACTIONS.QUANTITY_PLUS, PRODUCT_ACTIONS.QUANTITY_MINUS, PRODUCT_ACTIONS.REMOVE_PRODUCT, PRODUCT_ACTIONS.BUY),
        switchMap(() => this.store.select('products').take(1)),
        switchMap((products: Product[]) => fromPromise(this.angularFirestore.collection('lists').doc('z2kJVHelcptQt6ueEm9h').update({products: products}))),
        map(() => {
            return {
                type: API_ACTIONS.SYNC_SUCCESS
            }
        })
    );

    constructor(private actions$: Actions<Action>,
                private store: Store<AppState>,
                private angularFirestore: AngularFirestore
    ) {
    }

}
