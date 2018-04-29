import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../ui/categories/product.interface';
import {ModalsService} from '../../core/modals.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../appState.interface';
import {PRODUCT_ACTIONS} from '../../ui/categories/productActions.enum';
import {ListTypes} from './listTypes.enum';
import {Category} from '../../ui/categories/category.intefrace';
import {Router} from '@angular/router';

@Component({
    selector: 'app-list-item',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

    @Input() public type: ListTypes;
    @Input() public items: Product[] | Category[];
    @Input() public categoryId: string;
    @Output() public remove = new EventEmitter();
    @Output() public edit = new EventEmitter();
    @Output() public quantityPlus = new EventEmitter();
    @Output() public quantityMinus = new EventEmitter();
    @Output() public buy = new EventEmitter();

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    public navigate(productId) {
        const path = (this.type === ListTypes.PRODUCT) ? ['product', this.categoryId, productId] : ['category', productId];
        this.router.navigate(path);
    }


}
