import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../interfaces/appState.interface";
import {Observable} from "rxjs/Observable";
import {Product} from "../interfaces/product.interface";
import {PRODUCT_ACTIONS} from "../actions/productActions.enum";
import {id} from "./id";
import {ProductAction} from "../interfaces/productAction.interface";
import {undo} from "ngrx-undo";
import {FILTER_ACTIONS} from "../actions/filterActions.enum";
import {FiltersService} from "./filters.service";
import {Filters} from "../interfaces/filters.interface";
import 'rxjs/add/operator/take';

@Component({
    selector: 'app-root',
    template: `
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">Shopping List based on ngrx/store</a>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <ul class="col-12">
                    <li class="list-group-item d-flex justify-content-between align-items-center form-group">
                        <input type="text" class="form-control col-8" name="newProductName"
                               [(ngModel)]="newProductName"
                               placeholder="New product name" required>
                        <button type="submit" class="btn col-2" (click)="addProduct()" [disabled]="!newProductName">
                            Add
                        </button>
                        <button type="submit" class="btn col-2" (click)="undo()" [disabled]="!actions.length">
                            Undo
                        </button>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center form-group">
                        <span class="form-check" style="display: inline-block">
                              <input class="form-check-input" type="checkbox" (change)="onlyBought(filters$)"
                                     [ngModel]="(filters$ | async).bought" id="only_bought">
                              <label class="form-check-label" for="only_bought">
                                 Show only bought
                              </label>
                        </span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center"
                        *ngFor="let product of (products$ | async).filter(filter)">
                        <span class="form-check" style="display: inline-block">
                              <input class="form-check-input" type="checkbox" (change)="buy(product)" value=""
                                     id="bought_{{product.id}}"
                                     [ngModel]="product.bought">
                              <label class="form-check-label" for="bought_{{product.id}}">
                                                        {{ product.name }}
                              </label>
                        </span>
                        <span>
                            <button type="button" class="btn btn-danger btn-sm"
                                    (click)="removeProduct(product)">Remove</button>
                            <button type="button" class="btn btn-primary btn-sm"
                                    (click)="quantityPlus(product)">+</button>
                            <button type="button" class="btn btn-primary btn-sm"
                                    (click)="quantityMinus(product)">-</button>
                        <span class="badge badge-primary badge-pill">{{product.quantity}}</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    `,
    styles: []
})
export class AppComponent {
    public products$: Observable<Product[]>;
    public filters$: Observable<Filters>;
    public filter;
    public newProductName;
    private actions: ProductAction[] = [];

    constructor(private store: Store<AppState>, private filtersService: FiltersService) {
    }

    ngOnInit() {
        this.products$ = this.store.select('products');
        this.filters$ = this.store.select('filters' as any);
        this.filters$.subscribe((filters: Filters) => {
            this.filter = this.filtersService.get(filters)
        })
    }

    addProduct() {
        const action = {
            type: PRODUCT_ACTIONS.ADD_PRODUCT, payload: {
                id: id(),
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
        const state = this.getState(this.store);
        const action = {
            type: (!state.filters.bought) ? FILTER_ACTIONS.SHOW_BOUGHT : FILTER_ACTIONS.SHOW_ALL
    }
        this.store.dispatch(action);
    }

    undo() {
        this.store.dispatch(undo(this.actions[this.actions.length - 1]));
        this.actions.splice(this.actions.length - 1, 1);
    }

    getState(store: any) {
        let state;
        store.take(1).subscribe(s => state = s);
        return state;
    }

}
