import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {API_ACTIONS} from '../../apiActions.enum';
import {map, switchMap, catchError} from 'rxjs/operators';
import 'rxjs/operators/take';
import {AngularFirestore} from 'angularfire2/firestore';
import {AppState} from '../../appState.interface';
import {Product} from '../../ui/categories/product.interface';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {PRODUCT_ACTIONS} from '../../ui/categories/productActions.enum';
import {of} from 'rxjs/observable/of';
import {ProductAction} from '../../ui/categories/productAction.interface';
import {StoreManagementService} from '../store-management.service';
import {CATEGORY_ACTIONS} from '../../ui/categories/categoryActions.enum';
import {CategoryAction} from '../../ui/categories/categoryAction.interface';
import {Category} from '../../ui/categories/category.intefrace';

@Injectable()
export class ProductEffectsService {

    constructor(private actions$: Actions<Action>,
                private store: Store<AppState>,
                private angularFirestore: AngularFirestore,
                private storeManagementService: StoreManagementService
    ) {
    }


    @Effect()
    addProduct$: Observable<Action> = this.actions$.pipe(
        ofType(
            PRODUCT_ACTIONS.ADD_PRODUCT,
        ),
        switchMap((action: ProductAction) => {
            return this.store.select((state: AppState) => state.api.firebase.listId)
                .take(1)
                .pipe(
                    switchMap((listId) =>
                        fromPromise(
                            this.angularFirestore
                                .collection('lists')
                                .doc(listId)
                                .collection('categories')
                                .doc(action.payload.categoryId)
                                .collection('products')
                                .doc(action.payload.product.id)
                                .set(action.payload.product)
                        ))
                );
        }),
        map(() => {
            return {
                type: API_ACTIONS.FIREBASE_SUCCESS
            };
        }),
        catchError(err =>
            of({
                type: API_ACTIONS.FIREBASE_ERROR
            })
        )
    );

    @Effect()
    removeProduct$: Observable<Action> = this.actions$.pipe(
        ofType(
            PRODUCT_ACTIONS.REMOVE_PRODUCT,
        ),
        switchMap((action: ProductAction) => {
            return this.store.select((state: AppState) => state.api.firebase.listId)
                .take(1)
                .pipe(
                    switchMap((listId) =>
                        fromPromise(
                            this.angularFirestore
                                .collection('lists')
                                .doc(listId)
                                .collection('categories')
                                .doc(action.payload.categoryId)
                                .collection('products')
                                .doc(action.payload.product.id)
                                .delete()
                        ))
                );
        }),
        map(() => {
            return {
                type: API_ACTIONS.FIREBASE_SUCCESS
            };
        }),
        catchError(err =>
            of({
                type: API_ACTIONS.FIREBASE_ERROR
            })
        )
    );

    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType(
            PRODUCT_ACTIONS.QUANTITY_MINUS,
            PRODUCT_ACTIONS.QUANTITY_PLUS,
            PRODUCT_ACTIONS.BUY,
            PRODUCT_ACTIONS.EDIT
        ),
        switchMap((action: ProductAction) => {
            return this.store
                .take(1)
                .pipe(
                    switchMap((state: AppState) => {
                            const product = state.categories
                                .find((category: Category) => category.id === action.payload.categoryId)
                                .products
                                .find((productSearched: Product) => productSearched.id === action.payload.product.id);
                            return fromPromise(
                                this.angularFirestore
                                    .collection('lists')
                                    .doc(state.api.firebase.listId)
                                    .collection('categories')
                                    .doc(action.payload.categoryId)
                                    .collection('products')
                                    .doc(action.payload.product.id)
                                    .set(product)
                            );
                        }
                    )
                );
        }),
        map(() => {
            return {
                type: API_ACTIONS.FIREBASE_SUCCESS
            };
        }),
        catchError(err =>
            of({
                type: API_ACTIONS.FIREBASE_ERROR
            })
        )
    );
    //
    //
    // @Effect()
    // updateProducts$: Observable<Action> = this.actions$.pipe(
    //     ofType(
    //         PRODUCT_ACTIONS.UNBUY_ALL_PRODUCTS
    //     ),
    //     switchMap((action: ProductAction) => {
    //         return this.store
    //             .take(1)
    //             .pipe(
    //                 switchMap((state) => {
    //                         // since it is not possible to update whole collection using one api call, we need to do that in batch
    //                         const batch = this.angularFirestore.firestore.batch();
    //                         return (new Observable((observer) => {
    //                             Promise.all(this.storeManagementService.getProductsFirebaseReferences(state)).then((snapshots) => {
    //                                 snapshots.forEach((snapshot: any) => {
    //                                     batch.update(snapshot.ref, state.products.find((product: Product) => product.id === snapshot.id) as any)
    //                                 });
    //                                 observer.next();
    //                             });
    //                         })).switchMap(() => fromPromise(batch.commit()));
    //                     }
    //                 )
    //             );
    //     }),
    //     map(() => {
    //         return {
    //             type: API_ACTIONS.FIREBASE_SUCCESS
    //         };
    //     }),
    //     catchError(err =>
    //         of({
    //             type: API_ACTIONS.FIREBASE_ERROR
    //         })
    //     )
    // );

}
