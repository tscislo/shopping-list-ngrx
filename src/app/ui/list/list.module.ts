import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {FormsModule} from "@angular/forms";
import {FiltersService} from "./filters.service";
import {StoreManagementService} from "../../core/store-management.service";
import {ActionReducerMap, StoreModule} from "@ngrx/store";
import {productReducer} from "../../product.reducer";
import {filtersReducer} from "./filters.reducer";
import {ListRoutingModule} from "./list-routing.module";
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        FormsModule,
        ListRoutingModule,
        SharedModule,
        StoreModule.forFeature('list',
            {
                products: productReducer,
                filters: filtersReducer
            }
        )
    ],
    declarations: [
        ListComponent
    ],
    providers: [
        FiltersService,
        StoreManagementService
    ]
})
export class ListModule {
}
