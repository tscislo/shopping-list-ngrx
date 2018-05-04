import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {AppState} from '../../appState.interface';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {API_ACTIONS} from '../../apiActions.enum';
import {ApiAction} from '../../apiAction.interface';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {ModalsService} from '../modals.service';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ListEffectsService {

    constructor(private actions$: Actions<Action>,
                private store: Store<AppState>,
                private angularFirestore: AngularFirestore,
                private modalsService: ModalsService) {
    }

    @Effect()
    verifyListPIN$: Observable<Action> = this.actions$.pipe(
        ofType(
            API_ACTIONS.FIREBASE_LIST_ID_CHANGE_INIT
        ),
        switchMap((action: ApiAction) =>
            this.angularFirestore
                .collection(`lists`)
                .doc(action.payload.listId)
                .valueChanges()
                .take(1)
                .map((list: any) => {
                        if (list && list.pin === action.payload.pin) {
                            return {
                                type: API_ACTIONS.FIREBASE_LIST_ID_CHANGED,
                                payload: action.payload
                            };
                        } else {
                            return {
                                type: API_ACTIONS.FIREBASE_LIST_ID_NOT_CHANGED,
                                payload: action.payload
                            };
                        }
                    }
                )
        )
    );

    @Effect()
    createNewList$: Observable<Action> = this.actions$.pipe(
        ofType(
            API_ACTIONS.FIREBASE_CREATE_NEW_LIST
        ),
        switchMap((action: ApiAction) =>
            this.angularFirestore
                .collection(`lists`)
                .doc(action.payload.listId)
                .set(action.payload)
        ),
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

    @Effect({dispatch: false})
    listIdChanged$ = this.actions$.pipe(
        ofType(
            API_ACTIONS.FIREBASE_LIST_ID_CHANGED
        ),
        tap((action: ApiAction) => {
            this.modalsService.showInfo({
                title: 'Success!',
                message: `You switched to list number: ${action.payload.listId}. You can start adding new categories and products!`
            });
        })
    );


    @Effect({dispatch: false})
    listIdNotChanged$ = this.actions$.pipe(
        ofType(
            API_ACTIONS.FIREBASE_LIST_ID_NOT_CHANGED
        ),
        tap((action: ApiAction) => {
            this.modalsService.showInfo({
                title: 'Error!',
                message: `There was a problem to change the list. This list either does not exist yet or the PIN provided is not correct. You are still using previous list.`
            });
        })
    );

}
