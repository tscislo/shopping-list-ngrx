import {Injectable} from '@angular/core';
import {AppState} from "../appState.interface";
import {Store} from "@ngrx/store";
import {ProductAction} from "../productAction.interface";
import {undo} from "ngrx-undo";

@Injectable()
export class StoreManagementService {

    private start = Math.floor(Math.random() * (5000));
    private productActions: ProductAction[] = [];

    constructor(private store: Store<AppState>) {
    }

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
        this.store.dispatch(undo(this.productActions[this.productActions.length - 1]));
        this.productActions.splice(this.productActions.length - 1, 1);
    }

    public hasUndoActions = () => this.productActions.length

}