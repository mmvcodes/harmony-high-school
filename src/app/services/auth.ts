// src/app/services/auth.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes this service a singleton and available throughout the app
})
export class AuthService { // Class name remains AuthService
  private loggedInUserKey = 'loggedInUser'; // Key for storing logged-in user info in localStorage
  private studentIdKey = 'loggedInStudentId'; // Key for storing student ID for logged-in student

  constructor() { }

  /**
   * Mocks a user login process.
   * In a real application, this would involve API calls to a backend for authentication.
   * @param role The role of the user (admin, teacher, student).
   * @param username The username entered.
   * @param password The password entered.
   * @returns True if login is successful, false otherwise.
   */
  login(role: string, username: string, password: string): boolean {
    // Mock authentication logic:
    // Simple hardcoded credentials for demonstration.
    // Replace with actual API calls in a production environment.
    if (username === 'admin' && password === 'admin' && role === 'admin') {
      localStorage.setItem(this.loggedInUserKey, JSON.stringify({ role: 'admin', username: 'admin' }));
      localStorage.removeItem(this.studentIdKey); // Clear student ID for non-student roles
      return true;
    } else if (username === 'teacher' && password === 'teacher' && role === 'teacher') {
      localStorage.setItem(this.loggedInUserKey, JSON.stringify({ role: 'teacher', username: 'teacher' }));
      localStorage.removeItem(this.studentIdKey);
      return true;
    } else if (username === 'student' && password === 'student' && role === 'student') {
      localStorage.setItem(this.loggedInUserKey, JSON.stringify({ role: 'student', username: 'student' }));
      // For student, we need an ID to link to their data.
      // In a real app, this ID would come from the backend upon successful login.
      // For this mock, we'll assign a fixed ID (e.g., 1) for the 'student' user.
      localStorage.setItem(this.studentIdKey, '1'); // Assuming 'student' user maps to student ID 1
      return true;
    }
    return false; // Authentication failed
  }

  /**
   * Logs out the current user by clearing local storage.
   */
  logout(): void {
    localStorage.removeItem(this.loggedInUserKey); // Remove logged-in user data
    localStorage.removeItem(this.studentIdKey); // Remove student ID
  }

  /**
   * Returns the role of the currently logged-in user.
   * @returns The role string (e.g., 'admin', 'teacher', 'student') or null if no user is logged in.
   */
  loggedInRole(): string | null {
    const user = localStorage.getItem(this.loggedInUserKey);
    return user ? JSON.parse(user).role : null;
  }

  /**
   * Returns the full details of the currently logged-in user.
   * @returns An object containing role and username, or null if no user is logged in.
   */
  getLoggedInUser(): { role: string, username: string } | null {
    const user = localStorage.getItem(this.loggedInUserKey);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Returns the student ID associated with the currently logged-in student.
   * @returns The student ID as a number, or null if not a student or no ID is set.
   */
  getStudentIdForLoggedInStudent(): number | null {
    const studentId = localStorage.getItem(this.studentIdKey);
    return studentId ? parseInt(studentId, 10) : null;
  }
}