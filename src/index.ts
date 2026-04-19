import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    // provideRouter(APP_ROUTES, withHashLocation()),
    provideRouter(APP_ROUTES, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
    })),
    provideHttpClient(),
  ],
}).catch(err => console.error(err));

