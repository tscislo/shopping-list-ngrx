import { Injectable } from '@angular/core';
import {AppState} from "../appState.interface";
import {Store} from "@ngrx/store";

@Injectable()
export class StoreManagementService {

    private start = Math.floor(Math.random() * (5000));

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


}