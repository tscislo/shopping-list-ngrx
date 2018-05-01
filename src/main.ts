import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';
import {ENV_TYPES} from "./environments/envTypes.enum";

if (environment.production) {
  enableProdMode();
}

switch (environment.type) {
    case ENV_TYPES.ANDROID:
      document.write('<script type="text/javascript" src="cordova.js"></script>');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
