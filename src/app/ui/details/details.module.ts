import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule
  ],
  declarations: [DetailsComponent]
})
export class DetailsModule { }
