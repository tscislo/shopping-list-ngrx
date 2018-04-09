import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../appState.interface";
import {ActivatedRoute} from "@angular/router";
import {StoreManagementService} from "../../../core/store-management.service";
import {Product} from "../../../product.interface";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

    public product$:Observable<Product>;

    constructor(private store: Store<AppState>,
                private storeManagement: StoreManagementService,
                private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.product$ = this.store
            .take(1)
            .map((state: AppState) => state.products.find((product: Product) => product.id === parseInt(this.activatedRoute.snapshot.paramMap.get('id'))))

    }

}
