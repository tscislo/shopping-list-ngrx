import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {API_ACTIONS} from "../apiActions.enum";
import {catchError, delay, map, switchMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class SyncEffectsService {

    @Effect()
    sync$: Observable<Action> = this.actions$.pipe(
        ofType(API_ACTIONS.SYNC_GO),
        switchMap(action =>
            this.http
                .get("assets/sync.json")
                .pipe(
                    delay(3000),
                    map(() => {
                        return {
                            type: API_ACTIONS.SYNC_SUCCESS
                        }
                    }),
                    // TODO: Why this does not work???
                    // catchError(err => of(() => {
                    //     return {
                    //         type: API_ACTIONS.SYNC_ERROR
                    //     }
                    // }))
                )
        )
    );

    constructor(private actions$: Actions<Action>, private http: HttpClient) {
    }

}
