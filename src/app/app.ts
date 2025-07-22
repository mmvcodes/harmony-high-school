// src/app/app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like *ngIf, *ngFor
import { RouterOutlet } from '@angular/router'; // Import RouterOutlet for routing

// Import standalone components that will be used in this root component's template
// Corrected imports for flat components (header.ts, footer.ts)
import { Header } from './components/header';
import { Footer } from './components/footer';

@Component({
  selector: 'app-root', // The HTML tag used to embed this component
  standalone: true, // Mark this component as standalone
  imports: [
    CommonModule, // Required for Angular directives
    RouterOutlet, // Required for routing
    Header, // Import Header component by its class name
    Footer // Import Footer component by its class name
  ],
  templateUrl: './app.html', // The HTML template for this component
  styleUrls: ['./app.scss'] // Styles specific to this component (can be empty if only global/Tailwind styles are used)
})
export class App {
  title = 'Harmony High School'; // A property that can be used in the template
}