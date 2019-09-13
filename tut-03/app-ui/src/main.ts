import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {from, of} from 'rxjs'
import {delay, switchMap, take, tap} from 'rxjs/operators'

if (environment.production) {
    enableProdMode();
}

from(fetch('./assets/config/config.json')).pipe(
    switchMap(response => from(response.json())),
    tap(jsonConfig => {
        environment.config = {
            ...environment.config,
            ...jsonConfig
        }
        platformBrowserDynamic().bootstrapModule(AppModule)
            .catch(err => console.error(err));
    })
).subscribe()
