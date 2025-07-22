// src/app/components/header.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { Router } from '@angular/router'; // Import Router for navigation
import { AuthService } from '../services/auth'; // Corrected: Import from auth.ts

@Component({
  selector: 'app-header', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule], // Import CommonModule for directives like *ngIf
  templateUrl: './header.html', // Corrected: Path to the component's HTML template is now 'header.html'
  styleUrls: [] // No specific styles needed for this component, global styles or Tailwind are used
})
export class Header implements OnInit { // Corrected: Class name is 'Header'

  // Inject AuthService and Router into the component
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Lifecycle hook: called once after the component is initialized
    // No specific initialization logic needed here for this component
  }

  /**
   * Navigates to a specified route.
   * @param path The path to navigate to (e.g., 'home', 'login').
   */
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  /**
   * Logs out the current user and redirects to the home page.
   */
  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(['/home']); // Redirect to home after logout
  }
}