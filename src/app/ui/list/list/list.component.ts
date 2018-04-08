import {Component, OnInit} from '@angular/core';
import {undo} from "ngrx-undo";
import {Store} from "@ngrx/store";
import {StoreManagementService} from "../../../core/store-management.service";
import {FiltersService} from "../filters.service";
import {PRODUCT_ACTIONS} from "../../../productActions.enum";
import {Product} from "../../../product.interface";
import {Filters} from "../filters.interface";
import {ProductAction} from "../../../productAction.interface";
import {AppState} from "../../../appState.interface";
import {FILTER_ACTIONS} from "../filterActions.enum";
import * as Rx from "rxjs/Rx";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    public newProductName: string;
    public products: Product[];
    public filters: Filters;
    private actions: ProductAction[] = [];

    constructor(private store: Store<AppState>,
                private filtersService: FiltersService,
                private storeManagement: StoreManagementService
    ) {
    }

    ngOnInit() {
        Rx.Observable.combineLatest(
            this.store.select((state) => state.products),
            this.store.select((state) => state.list.filters),
            (products: Product[], filters: Filters) => {
                this.products = products.filter(this.filtersService.get(filters));
                this.filters = filters;
            }
        ).subscribe()
    }

    addProduct() {
        const action = {
            type: PRODUCT_ACTIONS.ADD_PRODUCT, payload: {
                id: this.storeManagement.getId(),
                name: this.newProductName,
                quantity: 0,
                bought: false,
            }
        }
        this.store.dispatch(action);
        this.actions.push(action);
    }

    removeProduct(product: Product) {
        const action = {
            type: PRODUCT_ACTIONS.REMOVE_PRODUCT, payload: product
        }
        this.store.dispatch(action);
        this.actions.push(action);
    }

    quantityPlus(product: Product) {
        const action = {
            type: PRODUCT_ACTIONS.QUANTITY_PLUS, payload: product
        }
        this.store.dispatch(action);
        this.actions.push(action);
    }

    quantityMinus(product: Product) {
        const action = {
            type: PRODUCT_ACTIONS.QUANTITY_MINUS, payload: product
        }
        this.store.dispatch(action);
        this.actions.push(action);
    }

    buy(product: Product) {
        const action = {
            type: PRODUCT_ACTIONS.BUY, payload: product
        }
        this.store.dispatch(action);
        this.actions.push(action);
    }

    onlyBought() {
        const state = this.storeManagement.get();
        const action = {
            type: (!state.list.filters.bought) ? FILTER_ACTIONS.SHOW_BOUGHT : FILTER_ACTIONS.SHOW_ALL
        }
        this.store.dispatch(action);
    }

    undo() {
        this.store.dispatch(undo(this.actions[this.actions.length - 1]));
        this.actions.splice(this.actions.length - 1, 1);
    }


}
