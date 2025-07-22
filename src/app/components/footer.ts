// src/app/components/footer.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for standalone components

@Component({
  selector: 'app-footer', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule], // Import CommonModule if any directives are used
  templateUrl: './footer.html', // Corrected: Path to the component's HTML template is now 'footer.html'
  styleUrls: [] // No specific styles needed for this component
})
export class Footer { // Corrected: Class name is 'Footer'
  // Property to display the current year in the footer
  currentYear: number = new Date().getFullYear();
}