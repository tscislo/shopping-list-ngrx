import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailsComponent} from './details/details.component';

const routes: Routes = [{
    path: ':id',
    component: DetailsComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailsRoutingModule {
}
