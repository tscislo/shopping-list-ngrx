import {Component, Inject, OnInit} from '@angular/core';
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Product} from "../../product.interface";

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

    private product: Product;
    public errorMatcher = {
        isErrorState: () => {
        }
    }

    constructor(private dialogRef: MatDialogRef<ConfirmationModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.errorMatcher.isErrorState = () => !this.isProductValid();
    }

    ngOnInit() {
        this.product = {...this.data}
    }

    close() {
        this.dialogRef.close(false);
    }

    save() {
        if (this.isProductValid()) {
            this.dialogRef.close(this.product);
        }
    }

    isProductValid = () => this.product.name.length;

}
