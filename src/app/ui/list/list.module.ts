import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {FormsModule} from "@angular/forms";
import {FiltersService} from "./filters.service";
import {StoreManagementService} from "../../core/store-management.service";
import {ActionReducerMap, StoreModule} from "@ngrx/store";
import {filtersReducer} from "./filters.reducer";
import {ListRoutingModule} from "./list-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { ListItemComponent } from './list-item/list-item.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ListRoutingModule,
        SharedModule,
        StoreModule.forFeature('list',
            {
                filters: filtersReducer
            }
        )
    ],
    declarations: [
        ListComponent,
        ListItemComponent
    ],
    providers: [
        FiltersService
    ]
})
export class ListModule {
}
