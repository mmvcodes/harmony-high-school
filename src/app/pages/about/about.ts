// src/app/pages/about/about.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for standalone components

@Component({
  selector: 'app-about', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule], // Import CommonModule if any directives are used
  templateUrl: './about.html', // Corrected: Path to the component's HTML template is now 'about.html'
  styleUrls: [] // No specific styles needed for this component
})
export class About { } // Corrected: Class name is 'About'