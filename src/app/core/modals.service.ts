import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmationModalComponent} from '../shared/confirmation-modal/confirmation-modal.component';
import {MatDialogRef} from '@angular/material/dialog/typings/dialog-ref';
import {Product} from '../ui/categories/product.interface';
import {EditModalComponent} from '../shared/edit-modal/edit-modal.component';
import {InfoModalComponent} from '../shared/info-modal/info-modal.component';

@Injectable()
export class ModalsService {

    constructor(private matDialog: MatDialog) {
    }

    public showConfirmation = (options): MatDialogRef<ConfirmationModalComponent> =>
        this.matDialog.open(ConfirmationModalComponent, {
            data: options
        })

    public showInfo = (options): MatDialogRef<InfoModalComponent> =>
        this.matDialog.open(InfoModalComponent, {
            data: options
        })


    public editItem = (item): MatDialogRef<EditModalComponent> =>
        this.matDialog.open(EditModalComponent, {
            data: item
        })

}
