// src/app/guards/auth-guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth'; // Corrected: Import from auth.ts
import { Observable } from 'rxjs'; // Import Observable for reactive programming

@Injectable({
  providedIn: 'root' // Makes this guard a singleton and available throughout the app
})
export class AuthGuard implements CanActivate { // Corrected: Class name is AuthGuard

  // Inject AuthService and Router
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Determines if a route can be activated.
   * This guard checks if the user is logged in and has the required role to access a route.
   * @param route The activated route snapshot, containing route configuration and parameters.
   * @param state The router state snapshot, representing the router's state at a moment in time.
   * @returns A boolean, UrlTree, Observable<boolean | UrlTree>, or Promise<boolean | UrlTree>
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Get the expected roles from the route's data property
    const expectedRoles = route.data['roles'] as Array<string>;
    // Get the role of the currently logged-in user
    const userRole = this.authService.loggedInRole();

    // Check if a user is logged in AND if their role is among the expected roles for this route
    if (userRole && expectedRoles.includes(userRole)) {
      return true; // User has the required role, allow access
    } else {
      // User is not logged in or does not have the correct role
      // Redirect to the login page
      this.router.navigate(['/login']);
      return false; // Prevent access to the route
    }
  }
}