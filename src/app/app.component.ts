import {Component} from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
    selector: 'app-root',
    template: `
        <app-header></app-header>
        <router-outlet></router-outlet>
    `,
    styles: []
})
export class AppComponent  {


}
