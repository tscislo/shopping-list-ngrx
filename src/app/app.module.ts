import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ActionReducer, StoreModule} from '@ngrx/store';
import {localStorageSync} from 'ngrx-store-localstorage';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {apiReducer} from './api.reducer';
import {EffectsModule} from '@ngrx/effects';
import {routerReducer, RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {RouterSerializer} from './core/router-serializer';
import {SharedModule} from './shared/shared.module';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirebaseEffectsService} from './core/firebase-effects.service';
import {FormsModule} from '@angular/forms';
import {HammerConfig} from './HammerConfig.class';
import {categoriesReducer} from "./ui/categories/categoriesReducer";
import {uiReducer} from "./ui.reducer";


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [
            'categories',
            // 'router',
            'api'
        ],
        rehydrate: true
    })(reducer);
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        StoreModule.forRoot({
            api: apiReducer,
            categories: categoriesReducer,
            router: routerReducer,
            ui: uiReducer
        }, {
            metaReducers: [
                localStorageSyncReducer
            ]
        }),
        StoreDevtoolsModule.instrument({
            // maxAge: 25
        }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router'
        }),
        EffectsModule.forRoot([FirebaseEffectsService]),
        CoreModule,
        SharedModule,
        FormsModule
    ],
    providers: [
        AngularFirestore,
        {provide: RouterStateSerializer, useClass: RouterSerializer},
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: HammerConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
