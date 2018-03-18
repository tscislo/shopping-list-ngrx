import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreModule} from "@ngrx/store";
import {productReducer} from "../reducers/product.reducer";
import {FormsModule} from "@angular/forms";
import {handleUndo} from 'ngrx-undo';
import {filtersReducer} from "../reducers/filters.reducer";
import {FiltersService} from "./filters.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({
            products: productReducer,
            filters: filtersReducer
        }, {metaReducers: [handleUndo]}),
        StoreDevtoolsModule.instrument(),
        FormsModule
    ],
    providers: [FiltersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
