// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {ENV_TYPES} from "./envTypes.enum";

export const environment = {
    production: false,
    type: ENV_TYPES.DEV,
    firebase: {
        apiKey: 'AIzaSyClTh6y86MHTHjFYTegJbG5xPCbwCZLl3s',
        authDomain: 'uplifted-engine-135118.firebaseapp.com',
        databaseURL: 'https://uplifted-engine-135118.firebaseio.com',
        projectId: 'uplifted-engine-135118',
        storageBucket: 'uplifted-engine-135118.appspot.com',
        messagingSenderId: '40127795694'

    }
};
