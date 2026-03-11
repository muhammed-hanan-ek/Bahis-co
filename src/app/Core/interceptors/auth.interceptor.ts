import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  let authReq = req;

  // Attach token
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
  }

  return next(authReq).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        // Token expired or invalid
        localStorage.clear();
        router.navigate(['/login']);
      }

      if (error.status === 403) {
        console.error("Access Denied");
      }

      if (error.status === 500) {
        console.error("Server Error");
      }

      return throwError(() => error);
    })

  );
};