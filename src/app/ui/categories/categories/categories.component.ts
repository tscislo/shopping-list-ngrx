import {Component, OnInit} from '@angular/core';
import {ModalsService} from '../../../core/modals.service';
import {AppState} from '../../../appState.interface';
import {StoreManagementService} from '../../../core/store-management.service';
import {Store} from '@ngrx/store';
import {Category} from '../category.intefrace';
import {CATEGORY_ACTIONS} from '../categoryActions.enum';
import {Product} from '../product.interface';
import {PRODUCT_ACTIONS} from '../productActions.enum';
import {Observable} from 'rxjs/Observable';
import {FirebaseSyncService} from '../../../core/firebase-sync.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    public categories$: Observable<Category[]>;
    public listId: Observable<string>;

    constructor(private store: Store<AppState>,
                public storeManagement: StoreManagementService,
                private modalService: ModalsService
    ) {
    }

    ngOnInit() {
        this.categories$ = this.store.select((state) => state.categories);
        this.listId = this.store.select((state) => state.api.firebase.listId);
    }


    addCategory(categoryName) {
        this.store.dispatch({
            type: CATEGORY_ACTIONS.ADD,
            payload: {
                id: this.storeManagement.getId(),
                name: categoryName,
                products: []
            }
        });
    }

    removeCategory(category: Category) {
        this.modalService.showConfirmation({
            title: 'Confirmation',
            question: `Are you sure you want to delete '${category.name}'?`
        }).afterClosed().subscribe((result) => {
            if (result) {
                const action = {
                    type: CATEGORY_ACTIONS.REMOVE,
                    payload: category
                };
                this.store.dispatch(action);
            }
        });
    }

    edit(category: Category) {
        setTimeout(() => {
            this.modalService.editItem(category)
                .afterClosed()
                .subscribe((result) => {
                    if (result) {
                        this.store.dispatch({
                            type: CATEGORY_ACTIONS.EDIT,
                            payload: result
                        });
                    }
                });
        }, 200);
    }


}
