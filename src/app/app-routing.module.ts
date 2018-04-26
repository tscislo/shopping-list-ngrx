import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './ui/products/products.module#ProductsModule'
    },
    {
        path: 'details',
        loadChildren: './ui/details/details.module#DetailsModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
