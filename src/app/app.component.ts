import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../interfaces/appState.interface";
import {Observable} from "rxjs/Observable";
import {Product} from "../interfaces/product.interface";
import {PRODUCT_ACTIONS} from "../actions/actions.enum";
import {id} from "./id";
import {ProductAction} from "../interfaces/action.interface";
import {undo} from "ngrx-undo";

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
                    <li class="list-group-item d-flex justify-content-between align-items-center"
                        *ngFor="let product of products$ | async">
                        {{ product.name }}
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
    public newProductName;
    private actions: ProductAction[] = [];

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.products$ = this.store.select('products');
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

    undo() {
        this.store.dispatch(undo(this.actions[this.actions.length - 1]));
        this.actions.splice(this.actions.length - 1, 1);
    }

}
