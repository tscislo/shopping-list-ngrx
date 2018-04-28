import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../appState.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {StoreManagementService} from '../../../core/store-management.service';
import {Product} from '../../categories/product.interface';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {MatSnackBar} from "@angular/material";
import {FirebaseSyncService} from "../../../core/firebase-sync.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

    public product$: Observable<Product>;
    public productsSubscription;

    constructor(private store: Store<AppState>,
                private storeManagement: StoreManagementService,
                private activatedRoute: ActivatedRoute,
                private firebaseSyncService: FirebaseSyncService
    ) {
    }

    getProduct = () => this.store
        .map((state: AppState) => {
            let products: Product[] = [];
            state.categories.forEach((category) => {
                products = [...products, ...category.products]
            })
            return products.find((product: Product) => product.id === this.activatedRoute.snapshot.paramMap.get('productId'))
        });

    ngOnInit() {

        this.product$ = this.getProduct();

        this.productsSubscription = this.getProduct().subscribe((product: Product) => {
            if (!product) {
                // TODO: Why in setTimeout?
                setTimeout(() => this.storeManagement.redirectToRoot('Product'));
            }
        });

        this.firebaseSyncService.syncProduct(this.activatedRoute.snapshot.paramMap.get('categoryId'), this.activatedRoute.snapshot.paramMap.get('productId'));
    }

    ngOnDestroy() {
        this.productsSubscription.unsubscribe();
        this.firebaseSyncService.unSyncProduct();
    }

}
