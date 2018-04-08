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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {apiReducer} from "./api.reducer";
import {EffectsModule} from "@ngrx/effects";
import {SyncEffectsService} from "./core/sync-effects.service";


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: ['list', 'products'], rehydrate: true})(reducer);
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot({
            api: apiReducer,
            products: productReducer
        }, {
            metaReducers: [
                handleUndo,
                localStorageSyncReducer
            ]
        }),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([SyncEffectsService]),
        CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
