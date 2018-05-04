import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule
} from '@angular/material';
import {OrderModule} from 'ngx-order-pipe';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import {FormsModule} from '@angular/forms';
import {ListComponent} from './list/list.component';
import {RouterModule} from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import {InfoModalComponent} from './info-modal/info-modal.component';

const exportableModules = [
    OrderModule,

    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatSnackBarModule
];

const exportableComponents = [
    HeaderComponent,
    ListComponent,
    AddItemComponent
];

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ...exportableModules
    ],
    declarations: [
        ...exportableComponents,
        ConfirmationModalComponent,
        EditModalComponent,
        InfoModalComponent,
        AddItemComponent
    ],
    exports: [
        HeaderComponent,
        ...exportableModules,
        ...exportableComponents
    ],
    entryComponents : [
        ConfirmationModalComponent,
        InfoModalComponent,
        EditModalComponent
    ]
})
export class SharedModule {
}
