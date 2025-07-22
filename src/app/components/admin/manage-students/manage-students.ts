// src/app/components/admin/manage-students/manage-students.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { DataService } from '../../../services/data'; // Import the data service

// Define the interface for a Student object
interface Student {
  id: number;
  name: string;
  age: number;
  class: string;
  section: string;
  course: string;
  document?: string; // Optional: for student dashboard upload
  grade?: string;     // Optional: for teacher dashboard
}

@Component({
  selector: 'app-manage-students', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './manage-students.html', // Corrected: Path to the component's HTML template is now 'manage-students.html'
  styleUrls: [] // No specific styles needed for this component
})
export class ManageStudents implements OnInit { // Corrected: Class name is 'ManageStudents'
  students: Student[] = []; // Array to hold the list of students
  // Object to hold data for adding or editing a student. Initialized with default values.
  editingStudent: Student = { id: 0, name: '', age: 0, class: '', section: '', course: '' };
  nextStudentId: number = 1; // Tracks the next available ID for new students

  // Inject the DataService
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Lifecycle hook: called once after the component is initialized
    this.students = this.dataService.getStudents(); // Load existing students from DataService
    this.nextStudentId = this.dataService.getNextStudentId(); // Get the next available student ID
  }

  /**
   * Saves a new student or updates an existing one.
   */
  saveStudent(): void {
    if (this.editingStudent.id) {
      // If editingStudent has an ID, it means we are updating an existing student
      this.dataService.updateStudent(this.editingStudent);
    } else {
      // Otherwise, it's a new student, assign a new ID and add it
      this.editingStudent.id = this.nextStudentId++;
      this.dataService.addStudent(this.editingStudent);
      this.dataService.setNextStudentId(this.nextStudentId); // Update the next available ID in DataService
    }
    this.resetForm(); // Clear the form after saving
    this.students = this.dataService.getStudents(); // Refresh the student list to reflect changes
  }

  /**
   * Populates the form with the details of a student for editing.
   * @param student The student object to edit.
   */
  editStudent(student: Student): void {
    this.editingStudent = { ...student }; // Create a shallow copy to avoid direct mutation of the original object
  }

  /**
   * Deletes a student from the list.
   * @param id The ID of the student to delete.
   */
  deleteStudent(id: number): void {
    // Use a simple confirmation dialog (in a real app, use a custom modal)
    if (confirm('Are you sure you want to delete this student?')) {
      this.dataService.deleteStudent(id); // Delete student via DataService
      this.students = this.dataService.getStudents(); // Refresh the student list
      this.resetForm(); // Reset the form in case the deleted student was being edited
    }
  }

  /**
   * Cancels the current edit operation and clears the form.
   */
  cancelEditStudent(): void {
    this.resetForm();
  }

  /**
   * Resets the editingStudent object to its initial empty state.
   */
  resetForm(): void {
    this.editingStudent = { id: 0, name: '', age: 0, class: '', section: '', course: '' };
  }
}