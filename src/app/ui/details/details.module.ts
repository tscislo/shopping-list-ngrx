import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DetailsRoutingModule} from './details-routing.module';
import {DetailsComponent} from './details/details.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        DetailsRoutingModule,
        SharedModule
    ],
    declarations: [DetailsComponent]
})
export class DetailsModule {
}
