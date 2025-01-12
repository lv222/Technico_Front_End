import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthInterceptor } from './auth.interceptor';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), AuthInterceptor, DatePipe]
};
