import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../product.interface';
import {ModalsService} from '../../core/modals.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../appState.interface';
import {PRODUCT_ACTIONS} from '../../productActions.enum';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {

    @Input() public products: Product[];
    @Output() public removeProduct = new EventEmitter();
    @Output() public quantityPlus = new EventEmitter();
    @Output() public quantityMinus = new EventEmitter();
    @Output() public buy = new EventEmitter();

    constructor(private modalsService: ModalsService,
                private store: Store<AppState>
    ) {
    }

    ngOnInit() {
    }

    edit(product: Product) {
        setTimeout(() => {
            this.modalsService.editProduct(product)
                .afterClosed()
                .subscribe((result) => {
                    if (result) {
                        this.store.dispatch({
                            type: PRODUCT_ACTIONS.EDIT,
                            payload: result
                        });
                    }
                });
        }, 200);
    }

}
