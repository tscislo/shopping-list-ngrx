import {Injectable} from '@angular/core';
import {AppState} from '../appState.interface';
import {Store} from '@ngrx/store';
import {ProductAction} from '../productAction.interface';
import {undo} from 'ngrx-undo';
import {PRODUCT_ACTIONS} from "../productActions.enum";
import {AngularFirestore} from "angularfire2/firestore";
import 'rxjs/add/operator/mergeMap';
import {Observable} from "rxjs/Observable";

@Injectable()
export class StoreManagementService {

    private start;
    private productActions: ProductAction[] = [];

    constructor(private store: Store<AppState>,
                private angularFirestore: AngularFirestore
    ) {
        this.start = this.generateId();
        this.store
            .select((state) => state.api.firebase.listId)
            .flatMap((listId) => {
                if (listId) {
                    return this.angularFirestore.collection('lists').doc(listId).valueChanges();
                } else {
                    return new Observable(() => {});
                }
            })
            .subscribe((products: any) => {
                console.log('from firebase')
                this.store.dispatch({
                    type: PRODUCT_ACTIONS.GET_PRODUCTS_FROM_FIREBASE,
                    payload: (products.products) ? products.products : []
                })
            });
    }

    public generateId = () => Math.floor(Math.random() * (100000000));

    public get() {
        let stateValue;
        this.store
            .take(1)
            .subscribe((outputStateValue) => stateValue = outputStateValue);
        return stateValue;
    }

    public getId = () => ++this.start;

    public addUndoAction(action: ProductAction) {
        this.productActions.push(action);
    }

    public undo() {
        // TODO: Undo for bought does not work???
        if (this.hasUndoActions()) {
            this.store.dispatch(undo(this.productActions[this.productActions.length - 1]));
            this.productActions.splice(this.productActions.length - 1, 1);
        }
    }

    public hasUndoActions = () => this.productActions.length;

}
