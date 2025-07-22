// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// Corrected import for routes
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

// Corrected imports for services and guards
import { AuthService } from './services/auth'; // From auth.ts
import { DataService } from './services/data'; // From data.ts
import { AuthGuard } from './guards/auth-guard'; // From auth-guard.ts

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configure routing for the application
    provideClientHydration(), // Enable client-side hydration (optional, for SSR)
    AuthService, // Provide AuthService globally
    DataService, // Provide DataService globally
    AuthGuard    // Provide AuthGuard globally (guards are injectable services)
  ]
};