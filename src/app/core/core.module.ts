import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreManagementService} from './store-management.service';
import {HttpClientModule} from '@angular/common/http';
import {FirebaseEffectsService} from './firebase-effects.service';
import {ModalsService} from './modals.service';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        FirebaseEffectsService,
        StoreManagementService,
        ModalsService
    ],
    declarations: []
})
export class CoreModule {
}
