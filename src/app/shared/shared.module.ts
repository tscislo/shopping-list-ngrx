import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule, MatProgressSpinnerModule,
    MatSelectionList, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatToolbarModule
} from '@angular/material';
import {ErrorModalComponent} from './error-modal/error-modal.component';
import {OrderModule} from "ngx-order-pipe";
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

const exportableModules = [
    OrderModule,

    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule
];

const exportableComponents = [
    HeaderComponent,
    ErrorModalComponent
]

@NgModule({
    imports: [
        CommonModule,
        ...exportableModules
    ],
    declarations: [
        ...exportableComponents,
        ConfirmationModalComponent
    ],
    exports: [
        HeaderComponent,
        ...exportableModules,
        ...exportableComponents
    ],
    entryComponents : [
        ErrorModalComponent,
        ConfirmationModalComponent
    ]
})
export class SharedModule {
}
