import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-info-modal',
    templateUrl: './info-modal.component.html',
    styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<InfoModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit() {
    }


    ok() {
        this.dialogRef.close(true);
    }

}
