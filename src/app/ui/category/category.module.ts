import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category/category.component';
import {FormsModule} from '@angular/forms';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {CategoryRoutingModule} from './category-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CategoryRoutingModule,
        SharedModule,
        // StoreModule.forFeature('categories',
        //     {
        //         filters: filtersReducer
        //     }
        // )
    ],
    declarations: [
        CategoryComponent
    ],
    providers: [
    ]
})
export class CategoryModule {
}
