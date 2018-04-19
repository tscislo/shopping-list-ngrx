import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreManagementService} from './store-management.service';
import {HttpClientModule} from '@angular/common/http';
import {SyncEffectsService} from './sync-effects.service';
import {FirebaseEffectsService} from "./firebase-effects.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        FirebaseEffectsService,
        StoreManagementService
    ],
    declarations: []
})
export class CoreModule {
}
