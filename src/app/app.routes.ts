// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Corrected imports for page components (class names and file paths)
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { TeacherDashboard } from './pages/teacher-dashboard/teacher-dashboard';
import { StudentDashboard } from './pages/student-dashboard/student-dashboard';

// Corrected import for the authentication guard
import { AuthGuard } from './guards/auth-guard';

// Define application routes
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route redirects to home
  { path: 'home', component: Home }, // Use class name Home
  { path: 'about', component: About }, // Use class name About
  { path: 'contact', component: Contact }, // Use class name Contact
  { path: 'login', component: Login }, // Use class name Login
  {
    path: 'admin-dashboard',
    component: AdminDashboard, // Use class name AdminDashboard
    canActivate: [AuthGuard], // Protect this route with AuthGuard
    data: { roles: ['admin'] } // Only 'admin' role can access
  },
  {
    path: 'teacher-dashboard',
    component: TeacherDashboard, // Use class name TeacherDashboard
    canActivate: [AuthGuard], // Protect this route with AuthGuard
    data: { roles: ['teacher'] } // Only 'teacher' role can access
  },
  {
    path: 'student-dashboard',
    component: StudentDashboard, // Use class name StudentDashboard
    canActivate: [AuthGuard], // Protect this route with AuthGuard
    data: { roles: ['student'] } // Only 'student' role can access
  },
  { path: '**', redirectTo: '/home' } // Wildcard route for any undefined paths, redirects to home
];