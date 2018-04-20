import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule, MatProgressSpinnerModule,
    MatSelectionList, MatSliderModule, MatSlideToggleModule,
    MatToolbarModule
} from '@angular/material';
import {ErrorModalComponent} from './error-modal/error-modal.component';

const exportableMatModules = [
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
    MatDialogModule
];

const exportableComponents = [
    HeaderComponent,
    ErrorModalComponent
]

@NgModule({
    imports: [
        CommonModule,
        ...exportableMatModules
    ],
    declarations: [
        ...exportableComponents
    ],
    exports: [
        HeaderComponent,
        ...exportableMatModules,
        ...exportableComponents
    ],
    entryComponents : [
        ErrorModalComponent
    ]
})
export class SharedModule {
}
