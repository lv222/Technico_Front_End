import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    // Add token to request headers if available
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error.status === 401) {
            // Token expired or unauthorized error
            // Redirect to login page or handle accordingly
            console.error('Unauthorized - Token Expired or Invalid');
            // You can redirect to login here
            return throwError(
              () => new Error('Unauthorized - Token Expired or Invalid')
            );
          }
          return throwError(() => error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
