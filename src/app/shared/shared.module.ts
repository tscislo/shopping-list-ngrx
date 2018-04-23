import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule
} from '@angular/material';
import {OrderModule} from "ngx-order-pipe";
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import {FormsModule} from "@angular/forms";

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
    MatSidenavModule,
    MatSnackBarModule
];

const exportableComponents = [
    HeaderComponent
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ...exportableModules
    ],
    declarations: [
        ...exportableComponents,
        ConfirmationModalComponent,
        EditModalComponent
    ],
    exports: [
        HeaderComponent,
        ...exportableModules,
        ...exportableComponents
    ],
    entryComponents : [
        ConfirmationModalComponent,
        EditModalComponent
    ]
})
export class SharedModule {
}
