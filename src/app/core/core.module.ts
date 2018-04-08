import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreManagementService} from "./store-management.service";

@NgModule({
  imports: [
    CommonModule
  ],
    providers: [StoreManagementService],
  declarations: []
})
export class CoreModule { }
