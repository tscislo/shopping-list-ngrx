import {Component, Inject, OnInit} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Product} from '../../ui/categories/product.interface';
import {Category} from '../../ui/categories/category.intefrace';

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

    public item: Product | Category;
    public errorMatcher = {
        isErrorState: () => {
        }
    };

    constructor(private dialogRef: MatDialogRef<ConfirmationModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.errorMatcher.isErrorState = () => !this.isValid();
    }

    ngOnInit() {
        this.item = {...this.data};
    }

    close() {
        this.dialogRef.close(false);
    }

    save() {
        if (this.isValid()) {
            this.dialogRef.close(this.item);
        }
    }

    isValid = () => this.item.name.length;

}
