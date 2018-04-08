import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {ActionReducer, StoreModule} from "@ngrx/store";
import {handleUndo} from 'ngrx-undo';
import {localStorageSync} from "ngrx-store-localstorage";
import {CoreModule} from "./core/core.module";
import {productReducer} from "./product.reducer";


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: ['list', 'products'], rehydrate: true})(reducer);
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({
            products: productReducer
        }, {
            metaReducers: [
                handleUndo,
                localStorageSyncReducer
            ]
        }),
        StoreDevtoolsModule.instrument(),
        CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
