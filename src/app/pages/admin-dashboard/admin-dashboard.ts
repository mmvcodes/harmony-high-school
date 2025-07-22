// src/app/pages/admin-dashboard/admin-dashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

// Corrected imports for standalone sub-components for admin dashboard
// Note: Importing from 'manage-students' and 'manage-teachers' directly, and using their class names.
import { ManageStudents } from '../../components/admin/manage-students/manage-students'; // Corrected import path and class name
import { ManageTeachers } from '../../components/admin/manage-teachers/manage-teachers'; // Corrected import path and class name

@Component({
  selector: 'app-admin-dashboard', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule, ManageStudents, ManageTeachers], // Import necessary modules and components by their class names
  templateUrl: './admin-dashboard.html', // Path to the component's HTML template
  styleUrls: [] // No specific styles needed for this component
})
export class AdminDashboard implements OnInit { // Class name is 'AdminDashboard'
  // Property to control which sub-section (students or teachers) is currently displayed
  adminSubSection: 'students' | 'teachers' = 'students'; // Default to 'students'

  constructor() { }

  ngOnInit(): void {
    // Lifecycle hook: called once after the component is initialized
    // Load the last active sub-section from local storage, or default to 'students'
    this.adminSubSection = localStorage.getItem('adminSubSection') as 'students' | 'teachers' || 'students';
  }

  /**
   * Sets the currently displayed admin sub-section and persists it to local storage.
   * @param section The section to display ('students' or 'teachers').
   */
  showAdminSubSection(section: 'students' | 'teachers'): void {
    this.adminSubSection = section;
    localStorage.setItem('adminSubSection', section); // Persist the selection
  }
}