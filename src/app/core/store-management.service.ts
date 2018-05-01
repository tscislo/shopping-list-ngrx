import {Injectable} from '@angular/core';
import {AppState} from '../appState.interface';
import {Store} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import {Product} from '../ui/categories/product.interface';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Injectable()
export class StoreManagementService {

    constructor(private store: Store<AppState>,
                private angularFirestore: AngularFirestore,
                private snackBar: MatSnackBar,
                private router: Router) {
    }

    public generateId = (length = 8) => Math.floor(Math.random() * Math.pow(10, length)).toString();

    public getId = () => this.generateId(15);

    public getProductsFirebaseReferences = (listId, categoryId, products: Product[]) =>
        products.map((product: Product) =>
            this.angularFirestore
                .collection('lists')
                .doc(listId)
                .collection('categories')
                .doc(categoryId)
                .collection('products')
                .doc(product.id)
                .ref
                .get()
        )

    public redirectToRoot(title) {
        this.snackBar.open(
            `${title} does not exist anymore...`,
            'Dismiss',
            {
                duration: 5000
            }
        );
        this.router.navigate(['/']);
    }


}
