import {Injectable} from '@angular/core';

@Injectable()
export class CordovaService {

    constructor() {
        console.log('cordova')
        document.addEventListener('backbutton', () => {
            window.close();
        }, false);
    }

}
