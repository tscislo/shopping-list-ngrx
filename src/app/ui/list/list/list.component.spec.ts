import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Store, StoreModule} from '@ngrx/store';
import {ListComponent} from './list.component';
import {SharedModule} from '../../../shared/shared.module';
import {CoreModule} from '../../../core/core.module';
import {FormsModule} from '@angular/forms';
import {ListItemComponent} from '../list-item/list-item.component';
import {AppRoutingModule} from '../../../app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {FiltersService} from '../filters.service';
import {filtersReducer} from '../filters.reducer';
import {productReducer} from '../../../product.reducer';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Product} from '../../../product.interface';
import {AngularFireModule} from "angularfire2";
import {environment} from "../../../../environments/environment";

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;
    let store: Store<any>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                        products: productReducer,
                    },
                    {
                        initialState: {
                            products: [],
                        }
                    }
                ),
                StoreModule.forFeature('list',
                    {
                        filters: filtersReducer
                    },
                    {
                        initialState: {
                            filters: {
                                bought: true
                            }
                        }
                    }
                ),
                SharedModule,
                CoreModule,
                FormsModule,
                AppRoutingModule,
                BrowserAnimationsModule,
                AngularFireModule.initializeApp({}),
            ],
            declarations: [
                ListComponent,
                ListItemComponent,
            ],
            providers: [
                FiltersService,
                {provide: APP_BASE_HREF, useValue: '/'}, // required by PhantomJS
            ]
        });

        await TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('addProduct()', () => {
        component.newProductName = 'testProduct';
        component.addProduct();
        store.select('products').subscribe((products: Product[]) => {
            expect(products.length).toBe(1);
            expect(products[0].name).toBe('testProduct');
            expect(products[0].quantity).toBe(0);
        });
    });

    it('removeProduct()', () => {
        component.newProductName = 'testProduct';
        component.addProduct();
        let addedProduct: Product;
        store.select('products').take(1).subscribe((products) => addedProduct = products[0]);
        component.removeProduct(addedProduct);
        store.select('products').subscribe((products: Product[]) => {
            expect(products.length).toBe(0);
        });
    });
});
