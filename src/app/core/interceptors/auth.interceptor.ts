import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const includeCredentials = req.url.includes('api.example.com') || req.method === 'POST';
  console.log("ENTERED TO INTERCEPTOR");
  const clonedRequest = req.clone({
    withCredentials: true
  });
  return next(clonedRequest);
};
