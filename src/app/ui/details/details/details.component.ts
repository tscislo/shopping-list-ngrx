import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../appState.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {StoreManagementService} from '../../../core/store-management.service';
import {Product} from '../../categories/product.interface';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {MatSnackBar} from "@angular/material";

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
                private router: Router,
                private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.product$ = this.store
            .map((state: AppState) => {
                let products: Product[] = [];
                state.categories.forEach((category) => {
                    products = [...products, ...category.products]
                })
                return products.find((product: Product) => product.id === this.activatedRoute.snapshot.paramMap.get('id'))
            });

        this.productsSubscription = this.product$.subscribe((product: Product) => {
            if (!product) {
                this.snackBar.open(
                    'Product does not exist anymore...',
                    'Dismiss',
                    {
                        duration: 5000
                    }
                );
                this.productsSubscription.unsubscribe();
                this.router.navigate(['/']);
            }
        })

    }

    ngOnDestroy() {
        if (this.productsSubscription) {
            this.productsSubscription.unsubscribe();
        }
    }

}
