import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {FormsModule} from '@angular/forms';
import {FiltersService} from './filters.service';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {filtersReducer} from './filters.reducer';
import {ProductsRoutingModule} from './products-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProductsRoutingModule,
        SharedModule,
        StoreModule.forFeature('list',
            {
                filters: filtersReducer
            }
        )
    ],
    declarations: [
        ListComponent
    ],
    providers: [
        FiltersService
    ]
})
export class ProductsModule {
}
