import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {StoreManagementService} from '../../../core/store-management.service';
import {PRODUCT_ACTIONS} from '../../categories/productActions.enum';
import {Product} from '../../categories/product.interface';
import {AppState} from '../../../appState.interface';
import {ModalsService} from '../../../core/modals.service';
import {Observable} from 'rxjs/Observable';
import {ListComponent} from "../../../shared/list/list.component";
import {timer} from "rxjs/observable/timer";
import 'rxjs/add/operator/debounce';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-products',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    public products$: Observable<Product[]>;
    public listId$: Observable<string>;
    private categoryId: string;
    public categoryName$: Observable<string>;

    @ViewChild(ListComponent) listItemComponent: ListComponent;

    constructor(private store: Store<AppState>,
                public storeManagement: StoreManagementService,
                private modalService: ModalsService,
                private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');

        this.products$ = this.store.select((state) => {
            return state.categories.find((category) => category.id === this.categoryId).products
        });

        this.categoryName$ = this.store.select((state) => {
            return state.categories.find((category) => category.id === this.categoryId).name
        });

        this.listId$ = this.store.select((state) => state.api.firebase.listId);

        this.listItemComponent.quantityPlus
            .debounce(() => timer(100))
            .subscribe(this.quantityPlus);

        this.listItemComponent.quantityMinus
            .debounce(() => timer(100))
            .subscribe(this.quantityMinus);
    }


    addProduct(productName) {
        if (productName) {
            const action = {
                type: PRODUCT_ACTIONS.ADD_PRODUCT,
                payload: {
                    categoryId: this.categoryId,
                    product: {
                        id: this.storeManagement.getId(),
                        name: productName,
                        quantity: 1,
                        bought: false
                    }
                }
            };
            this.store.dispatch(action);
        }
    }

    removeProduct(product: Product) {
        this.modalService.showConfirmation({
            title: 'Confirmation',
            question: `Are you sure you want to delete '${product.name}'?`
        }).afterClosed().subscribe((result) => {
            if (result) {
                const action = {
                    type: PRODUCT_ACTIONS.REMOVE_PRODUCT,
                    payload:
                        {
                            categoryId: this.categoryId,
                            product
                        }
                };
                this.store.dispatch(action);
            }
        });
    }

    edit(product: Product) {
        setTimeout(() => {
            this.modalService
                .editItem(product)
                .afterClosed()
                .subscribe((result) => {
                    if (result) {
                        this.store.dispatch({
                            type: PRODUCT_ACTIONS.EDIT,
                            payload: {
                                categoryId: this.categoryId,
                                product: result
                            }
                        });
                    }
                });
        }, 200);
    }

    quantityPlus = (product: Product) => {
        const action = {
            type: PRODUCT_ACTIONS.QUANTITY_PLUS,
            payload: {
                categoryId: this.categoryId,
                product
            }
        };
        this.store.dispatch(action);
    }

    quantityMinus = (product: Product) => {
        const action = {
            type: PRODUCT_ACTIONS.QUANTITY_MINUS,
            payload: {
                categoryId: this.categoryId,
                product
            }
        };
        this.store.dispatch(action);
    }

    buy(product: Product) {
        const action = {
            type: PRODUCT_ACTIONS.BUY,
            payload: {
                categoryId: this.categoryId,
                product
            }
        };
        this.store.dispatch(action);
    }

    public unBuy = () => {
        this.modalService.showConfirmation({
            title: 'Confirmation',
            question: `Are you sure you want to mark ALL products as unbought?`
        }).afterClosed().subscribe((result) => {
            if (result) {
                this.store.dispatch({
                    type: PRODUCT_ACTIONS.UNBUY_ALL_PRODUCTS,
                    payload: {
                        categoryId: this.categoryId
                    }
                })
            }
        });
    }

}
