import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule, MatProgressSpinnerModule,
    MatSelectionList, MatSliderModule, MatSlideToggleModule,
    MatToolbarModule
} from '@angular/material';

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
    MatCardModule
];

@NgModule({
    imports: [
        CommonModule,
        ...exportableMatModules
    ],
    declarations: [HeaderComponent],
    exports: [
        HeaderComponent,
        ...exportableMatModules
    ]
})
export class SharedModule {
}
