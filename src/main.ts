import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withHashLocation, withPreloading } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [    
    provideHttpClient(),  
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withHashLocation()
    ),    
  ],
})
  .catch((err) => console.error(err));
