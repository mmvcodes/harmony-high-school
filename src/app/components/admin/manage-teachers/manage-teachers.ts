// src/app/components/admin/manage-teachers/manage-teachers.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { DataService } from '../../../services/data'; // Import the data service

// Define the interface for a Teacher object
interface Teacher {
  id: number;
  name: string;
  subject: string;
  experience: number;
  qualification: string;
  contact: string;
}

@Component({
  selector: 'app-manage-teachers', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './manage-teachers.html', // Corrected: Path to the component's HTML template is now 'manage-teachers.html'
  styleUrls: [] // No specific styles needed for this component
})
export class ManageTeachers implements OnInit { // Corrected: Class name is 'ManageTeachers'
  teachers: Teacher[] = []; // Array to hold the list of teachers
  // Object to hold data for adding or editing a teacher. Initialized with default values.
  editingTeacher: Teacher = { id: 0, name: '', subject: '', experience: 0, qualification: '', contact: '' };
  nextTeacherId: number = 1; // Tracks the next available ID for new teachers

  // Inject the DataService
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Lifecycle hook: called once after the component is initialized
    this.teachers = this.dataService.getTeachers(); // Load existing teachers from DataService
    this.nextTeacherId = this.dataService.getNextTeacherId(); // Get the next available teacher ID
  }

  /**
   * Saves a new teacher or updates an existing one.
   */
  saveTeacher(): void {
    if (this.editingTeacher.id) {
      // If editingTeacher has an ID, it means we are updating an existing teacher
      this.dataService.updateTeacher(this.editingTeacher);
    } else {
      // Otherwise, it's a new teacher, assign a new ID and add it
      this.editingTeacher.id = this.nextTeacherId++;
      this.dataService.addTeacher(this.editingTeacher);
      this.dataService.setNextTeacherId(this.nextTeacherId); // Update the next available ID in DataService
    }
    this.resetForm(); // Clear the form after saving
    this.teachers = this.dataService.getTeachers(); // Refresh the teacher list to reflect changes
  }

  /**
   * Populates the form with the details of a teacher for editing.
   * @param teacher The teacher object to edit.
   */
  editTeacher(teacher: Teacher): void {
    this.editingTeacher = { ...teacher }; // Create a shallow copy to avoid direct mutation of the original object
  }

  /**
   * Deletes a teacher from the list.
   * @param id The ID of the teacher to delete.
   */
  deleteTeacher(id: number): void {
    // Use a simple confirmation dialog (in a real app, use a custom modal)
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.dataService.deleteTeacher(id); // Delete teacher via DataService
      this.teachers = this.dataService.getTeachers(); // Refresh the teacher list
      this.resetForm(); // Reset the form in case the deleted teacher was being edited
    }
  }

  /**
   * Cancels the current edit operation and clears the form.
   */
  cancelEditTeacher(): void {
    this.resetForm();
  }

  /**
   * Resets the editingTeacher object to its initial empty state.
   */
  resetForm(): void {
    this.editingTeacher = { id: 0, name: '', subject: '', experience: 0, qualification: '', contact: '' };
  }
}