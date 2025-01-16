import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const router = inject(Router); // Angular injects services into the function-based interceptor
  const token = localStorage.getItem('token');

  // Clone the request and add the Authorization header if token exists
  const clonedRequest = token ? addAuthorizationHeader(req, token) : req;

  return next(clonedRequest).pipe(
    catchError((error) => handleError(error, router))
  );
};

// Helper function to add the Authorization header
function addAuthorizationHeader(
  req: HttpRequest<any>,
  token: string
): HttpRequest<any> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Helper function for error handling
function handleError(error: any, router: Router): Observable<never> {
  if (error.status === 401) {
    // Handle token expiration or unauthorized error
    console.error('Unauthorized - Token Expired or Invalid');
    router.navigate(['/login']);
  }
  return throwError(() => error); // Propagate the error
}
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');

//     // Add token to request headers if available
//     if (token) {
//       const cloned = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return next.handle(cloned).pipe(
//         catchError((error) => {
//           if (error.status === 401) {
//             // Token expired or unauthorized error
//             // Redirect to login page
//             console.error('Unauthorized - Token Expired or Invalid');
//             this.router.navigate(['/login']);
//             return throwError(
//               () => new Error('Unauthorized - Token Expired or Invalid')
//             );
//           }
//           return throwError(() => error);
//         })
//       );
//     } else {
//       return next.handle(req);
//     }
//   }
// }
