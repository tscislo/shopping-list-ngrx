import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {API_ACTIONS} from '../../apiActions.enum';
import {catchError, map, switchMap} from 'rxjs/operators';
import 'rxjs/operators/take';
import {AngularFirestore} from 'angularfire2/firestore';
import {AppState} from '../../appState.interface';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {of} from 'rxjs/observable/of';
import {CATEGORY_ACTIONS} from '../../ui/categories/categoryActions.enum';
import {CategoryAction} from '../../ui/categories/categoryAction.interface';

@Injectable()
export class CategoryEffectsService {

    constructor(private actions$: Actions<Action>,
                private store: Store<AppState>,
                private angularFirestore: AngularFirestore
    ) {
    }


    @Effect()
    addCategory$: Observable<Action> = this.actions$.pipe(
        ofType(
            CATEGORY_ACTIONS.ADD
        ),
        switchMap((action: CategoryAction) => {
            return this.store.select((state: AppState) => state.api.firebase.listId)
                .take(1)
                .pipe(
                    switchMap((listId) => {
                            delete action.payload.products;
                            return fromPromise(
                                this.angularFirestore
                                    .collection('lists')
                                    .doc(listId)
                                    .collection('categories')
                                    .doc(action.payload.id)
                                    .set(action.payload)
                            );
                        }
                    )
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
    removeCategory$: Observable<Action> = this.actions$.pipe(
        ofType(
            CATEGORY_ACTIONS.REMOVE
        ),
        switchMap((action: CategoryAction) => {
            return this.store.select((state: AppState) => state.api.firebase.listId)
                .take(1)
                .pipe(
                    switchMap((listId) =>
                        fromPromise(
                            this.angularFirestore
                                .collection('lists')
                                .doc(listId)
                                .collection('categories')
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
    editCategory$: Observable<Action> = this.actions$.pipe(
        ofType(
            CATEGORY_ACTIONS.EDIT
        ),
        switchMap((action: CategoryAction) => {
            return this.store.select((state: AppState) => state.api.firebase.listId)
                .take(1)
                .pipe(
                    switchMap((listId) =>
                        fromPromise(
                            this.angularFirestore
                                .collection('lists')
                                .doc(listId)
                                .collection('categories')
                                .doc(action.payload.id)
                                .update({
                                    name: action.payload.name
                                })
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
