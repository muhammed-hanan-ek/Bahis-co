import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Core/interceptors/auth.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
     provideToastr({
      timeOut: 5000,
       positionClass: 'toast-bottom-right',
        toastClass: 'ngx-toastr custom-toast-width',
      preventDuplicates: true,
      closeButton: false, // Make sure this is true
      progressBar: false,
      enableHtml: false, // Set to false to avoid conflicts
      newestOnTop: true,
      tapToDismiss: true,
      maxOpened: 5,
      autoDismiss: false,
      includeTitleDuplicates: true,
      resetTimeoutOnDuplicate: false
    }),
  ],
};
