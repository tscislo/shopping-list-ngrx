import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {StoreManagementService} from '../../../core/store-management.service';
import {FiltersService} from '../filters.service';
import {PRODUCT_ACTIONS} from '../../../productActions.enum';
import {Product} from '../../../product.interface';
import {Filters} from '../filters.interface';
import {AppState} from '../../../appState.interface';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {AngularFirestore} from "angularfire2/firestore";
import {ModalsService} from "../../../core/modals.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    public newProductName: string;
    public products: Product[];
    public filters: Filters;
    public listId: Observable<string>;

    constructor(private store: Store<AppState>,
                private filtersService: FiltersService,
                public storeManagement: StoreManagementService,
                private modalService: ModalsService,
                private angularFirestore: AngularFirestore
    ) {
    }

    ngOnInit() {
        combineLatest(
            this.store.select((state) => state.products),
            this.store.select((state) => state.list.filters),
            (products: Product[], filters: Filters) => {
                this.products = products.filter(this.filtersService.get(filters));
                this.filters = filters;
            }
        ).subscribe();

        this.listId = this.store.select((state) => state.api.firebase.listId);
    }

    addProduct() {
        if(this.newProductName) {
            const action = {
                type: PRODUCT_ACTIONS.ADD_PRODUCT, payload: {
                    id: this.storeManagement.getId(),
                    name: this.newProductName,
                    quantity: 1,
                    bought: false,
                }
            };
            this.newProductName = '';
            this.store.dispatch(action);
            this.storeManagement.addUndoAction(action);
        }
    }

    removeProduct(product: Product) {
        this.modalService.showConfirmation({
            title: "Confirmation",
            question: `Are you sure you want to delete '${product.name}'?`
        }).afterClosed().subscribe((result) => {
            if (result) {
                const action = {
                    type: PRODUCT_ACTIONS.REMOVE_PRODUCT,
                    payload: product
                };
                this.store.dispatch(action);
                this.storeManagement.addUndoAction(action);
            }
        })
    }

    quantityPlus(product: Product) {
        const action = {
            type: PRODUCT_ACTIONS.QUANTITY_PLUS,
            payload: product
        };
        this.store.dispatch(action);
        this.storeManagement.addUndoAction(action);
    }

    quantityMinus(product: Product) {
        const action = {
            type: PRODUCT_ACTIONS.QUANTITY_MINUS,
            payload: product
        };
        this.store.dispatch(action);
        this.storeManagement.addUndoAction(action);
    }

    buy(product: Product) {
        const action = {
            type: PRODUCT_ACTIONS.BUY,
            payload: product
        };
        this.store.dispatch(action);
        this.storeManagement.addUndoAction(action);
    }

    // onlyBought() {
    //     const state = this.storeManagement.get();
    //     const action = {
    //         type: (!state.list.filters.bought) ? FILTER_ACTIONS.SHOW_BOUGHT : FILTER_ACTIONS.SHOW_ALL
    //     };
    //     this.store.dispatch(action);
    // }


}
