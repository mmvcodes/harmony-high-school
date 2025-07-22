// src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { AuthService } from '../../services/auth'; // Corrected: Import from auth.ts
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-login', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [FormsModule, CommonModule], // Import FormsModule for ngModel, CommonModule for *ngIf
  templateUrl: './login.html', // Corrected: Path to the component's HTML template is now 'login.html'
  styleUrls: [] // No specific styles needed for this component
})
export class Login { // Corrected: Class name is 'Login'
  // Object to hold login form data (role, username, password)
  loginData = {
    role: '',
    username: '',
    password: ''
  };
  loginMessage: string = ''; // Message to display login status or errors

  // Inject AuthService and Router
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Handles the login form submission.
   * Authenticates the user and redirects to the appropriate dashboard.
   */
  login(): void {
    // Attempt to log in using the AuthService
    const success = this.authService.login(this.loginData.role, this.loginData.username, this.loginData.password);
    if (success) {
      this.loginMessage = ''; // Clear any previous login messages
      // Redirect based on the logged-in role
      switch (this.loginData.role) {
        case 'admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        case 'teacher':
          this.router.navigate(['/teacher-dashboard']);
          break;
        case 'student':
          this.router.navigate(['/student-dashboard']);
          break;
        default:
          this.router.navigate(['/home']); // Fallback to home if role is unexpected
          break;
      }
    } else {
      // Display error message for invalid credentials
      this.loginMessage = 'Invalid credentials or role.';
    }
  }
}