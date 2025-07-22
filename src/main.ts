// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // Import the standalone root component
import { appConfig } from './app/app.config'; // Import the application configuration

// Bootstrap the Angular application with the root component and its configuration
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));