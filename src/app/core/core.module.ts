import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreManagementService} from './store-management.service';
import {HttpClientModule} from '@angular/common/http';
import {ProductEffectsService} from './effects/product-effects.service';
import {ModalsService} from './modals.service';
import {FormsModule} from '@angular/forms';
import {CategoryEffectsService} from "./effects/category-effects.service";
import {FirebaseSyncService} from "./firebase-sync.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        ProductEffectsService,
        CategoryEffectsService,
        StoreManagementService,
        ModalsService,
        FirebaseSyncService
    ],
    declarations: []
})
export class CoreModule {
}
