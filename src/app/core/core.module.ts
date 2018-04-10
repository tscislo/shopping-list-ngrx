import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreManagementService} from './store-management.service';
import {HttpClientModule} from '@angular/common/http';
import {SyncEffectsService} from './sync-effects.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        SyncEffectsService,
        StoreManagementService
    ],
    declarations: []
})
export class CoreModule {
}
