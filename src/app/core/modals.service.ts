import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {ConfirmationModalComponent} from "../shared/confirmation-modal/confirmation-modal.component";
import {MatDialogRef} from "@angular/material/dialog/typings/dialog-ref";

@Injectable()
export class ModalsService {

    constructor(private matDialog: MatDialog) {
    }

    public showConfirmation = (options): MatDialogRef<ConfirmationModalComponent> =>
        this.matDialog.open(ConfirmationModalComponent, {
            data: options
        });


}
