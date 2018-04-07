import { Injectable } from '@angular/core';
import {AppState} from "../interfaces/appState.interface";
import {Store} from "@ngrx/store";

@Injectable()
export class StoreManagementService {

  constructor(private store: Store<AppState>) { }

  public get(stateName:string) {
    let stateValue;
    this.store
        .take(1)
        .map((allStates) => allStates[stateName])
        .subscribe((outputStateValue) => stateValue = outputStateValue);
    return stateValue;
  }


}
