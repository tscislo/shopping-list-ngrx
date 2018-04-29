import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../appState.interface';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {Category} from '../ui/categories/category.intefrace';
import {CATEGORY_ACTIONS} from '../ui/categories/categoryActions.enum';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../ui/categories/product.interface';
import {PRODUCT_ACTIONS} from '../ui/categories/productActions.enum';
import * as _ from 'lodash';

@Injectable()
export class FirebaseSyncService {

    public productSync: Subscription;
    public productsSync: Subscription;

    constructor(private store: Store<AppState>,
                private angularFirestore: AngularFirestore) {
    }

    public syncCategories() {
        this.store
            .select((state) => state.api.firebase.listId)
            .switchMap((listId) => {
                if (listId) {
                    return this.angularFirestore
                        .collection('lists')
                        .doc(listId)
                        .collection('categories')
                        .valueChanges();
                } else {
                    return new Observable();
                }
            })
            // Emits only when categories from Firebase are different then those in the store
            .switchMap((categoriesFromFirebase: Category[]) => this.store
                .select((state: AppState) => state.categories)
                .map((categories: Category[]) =>
                    categories.map((category: Category) => {
                        delete category.products;
                        return category;
                    })
                )
                .take(1)
                .switchMap((categoriesFromStore: Category[]) => this.emitWhenDifferent(categoriesFromStore, categoriesFromFirebase)
                )
            )
            // TODO: In case there is a network connection problem valueChanges does not emit error... WHY???
            .subscribe((categoriesFromFirebase: Category[]) => {
                console.log('Categories taken from FireBase!');
                this.store.dispatch({
                    type: CATEGORY_ACTIONS.GET_FORM_FIREBASE,
                    payload: (categoriesFromFirebase.length) ? categoriesFromFirebase : []
                });
            });
    }


    public syncProducts(categoryId: string) {
        this.productsSync = this.store
            .select((state) => state.api.firebase.listId)
            .switchMap((listId) => {
                if (listId) {
                    return this.angularFirestore
                        .collection('lists')
                        .doc(listId)
                        .collection('categories')
                        .doc(categoryId)
                        .collection('products')
                        .valueChanges();
                } else {
                    return new Observable();
                }
            })
            // Emits only when products from Firebase are different then those in the store
            .switchMap((productsFromFirebase: Product[]) => this.store
                .select((state: AppState) => state.categories)
                .map((categories: Category[]) =>
                    categories.find((category: Category) => category.id === categoryId).products
                )
                .take(1)
                .switchMap((productsFromStore: Product[]) => this.emitWhenDifferent(productsFromStore, productsFromFirebase)
                )
            )
            // TODO: In case there is a network connection problem valueChanges does not emit error... WHY???
            .subscribe((productsFromFirebase: Product[]) => {
                console.log('Products taken from FireBase!');
                this.store.dispatch({
                    type: PRODUCT_ACTIONS.GET_PRODUCTS_FROM_FIREBASE,
                    payload: {
                        categoryId,
                        products: (productsFromFirebase.length) ? productsFromFirebase : []
                    }
                });
            });
    }

    public unSyncProducts() {
        this.productsSync.unsubscribe();
    }

    public syncProduct(categoryId: string, productId: string) {
        this.productSync = this.store
            .select((state) => state.api.firebase.listId)
            .switchMap((listId) => {
                if (listId) {
                    return this.angularFirestore
                        .collection('lists')
                        .doc(listId)
                        .collection('categories')
                        .doc(categoryId)
                        .collection('products')
                        .doc(productId)
                        .valueChanges();
                } else {
                    return new Observable();
                }
            })
            // TODO: In case there is a network connection problem valueChanges does not emit error... WHY???
            .subscribe((productFromFirebase: Product) => {
                console.log('Product taken from FireBase!');
                if (productFromFirebase) {
                    this.store.dispatch({
                        type: PRODUCT_ACTIONS.GET_PRODUCT_FROM_FIREBASE,
                        payload: {
                            categoryId,
                            product: productFromFirebase
                        }
                    });
                } else {
                    this.store.dispatch({
                        type: PRODUCT_ACTIONS.REMOVE_PRODUCT_FROM_FIREBASE,
                        payload: {
                            categoryId,
                            product: {
                                id: productId
                            }
                        }
                    });
                }
            });
    }

    public unSyncProduct() {
        this.productSync.unsubscribe();
    }

    private emitWhenDifferent = (fromStore: any[], fromFirebase: any[]) => new Observable((observer) => {
        if (!_.isEqual(_.sortBy(fromStore, ['id']), _.sortBy(fromFirebase, ['id']))) {
            observer.next(fromFirebase);
        }
    })

}
