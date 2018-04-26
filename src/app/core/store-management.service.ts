import {Injectable} from '@angular/core';
import {AppState} from '../appState.interface';
import {Store} from '@ngrx/store';
import {ProductAction} from '../ui/categories/productAction.interface';
import {undo} from 'ngrx-undo';
import {PRODUCT_ACTIONS} from '../ui/categories/productActions.enum';
import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Product} from '../ui/categories/product.interface';
import * as _ from 'lodash';

@Injectable()
export class StoreManagementService {

    constructor(private store: Store<AppState>,
                private angularFirestore: AngularFirestore
    ) {
        // this.store
        //     .select((state) => state.api.firebase.listId)
        //     .switchMap((listId) => {
        //         if (listId) {
        //             return this.angularFirestore
        //                 .collection('lists')
        //                 .doc(listId)
        //                 .collection('products')
        //                 .valueChanges();
        //         } else {
        //             return new Observable(() => {
        //             });
        //         }
        //     })
        //     .switchMap((productsFromFirebase: Product[]) => this.store
        //         .select((state) => state.products)
        //         .take(1)
        //         .switchMap((products: Product[]) => new Observable((observer) => {
        //                 if (!_.isEqual(products, productsFromFirebase)) {
        //                     observer.next(productsFromFirebase);
        //                 }
        //             })
        //         )
        //     )
        //     // TODO: In case there is a network connection problem valueChanges does not emit error... WHY???
        //     .subscribe((productsFromFirebase: Product[]) => {
        //         console.log('Products taken from FireBase!');
        //         this.store.dispatch({
        //             type: PRODUCT_ACTIONS.GET_PRODUCTS_FROM_FIREBASE,
        //             payload: (productsFromFirebase.length) ? productsFromFirebase : []
        //         });
        //     });
    }

    public generateId = (length = 8) => Math.floor(Math.random() * Math.pow(10, length)).toString();

    public getId = () => this.generateId(15);

    public getProductsFirebaseReferences = (state) =>
        state.items.map((product: Product) =>
            this.angularFirestore
                .collection('lists')
                .doc(state.api.firebase.listId)
                .collection('products')
                .doc(product.id)
                .ref
                .get()
        );


}
