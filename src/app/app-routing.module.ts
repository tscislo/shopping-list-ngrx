import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './ui/categories/categories.module#CategoriesModule'
    },
    {
        path: 'category',
        loadChildren: './ui/category/category.module#CategoryModule'
    },
    {
        path: 'product',
        loadChildren: './ui/details/details.module#DetailsModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
