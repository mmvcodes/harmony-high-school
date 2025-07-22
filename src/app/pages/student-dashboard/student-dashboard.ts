// src/app/pages/student-dashboard/student-dashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { AuthService } from '../../services/auth'; // Corrected: Import from auth.ts
import { DataService } from '../../services/data'; // Corrected: Import from data.ts

// Define the interface for a Student object
interface Student {
  id: number;
  name: string;
  age: number;
  class: string;
  section: string;
  course: string;
  document?: string; // Optional: to store base64 or URL of uploaded document
  grade?: string;     // Optional: to display grade from teacher
}

@Component({
  selector: 'app-student-dashboard', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './student-dashboard.html', // Corrected: Path to the component's HTML template is now 'student-dashboard.html'
  styleUrls: [] // No specific styles needed for this component
})
export class StudentDashboard implements OnInit { // Corrected: Class name is 'StudentDashboard'
  // Object to hold details of the currently logged-in student
  currentStudentDetails: Student = { id: 0, name: '', age: 0, class: '', section: '', course: '' };
  studentDashboardMessage: string = ''; // Message to display status
  studentDashboardMessageSuccess: boolean = false; // Flag for message styling
  selectedFile: File | null = null; // Holds the selected PDF file for upload

  // Inject AuthService and DataService
  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
    // Lifecycle hook: called once after the component is initialized
    const loggedInUser = this.authService.getLoggedInUser(); // Get logged-in user details
    if (loggedInUser && loggedInUser.role === 'student') {
      const studentId = this.authService.getStudentIdForLoggedInStudent(); // Get the associated student ID
      if (studentId) {
        const student = this.dataService.getStudentById(studentId); // Try to load student data
        if (student) {
          this.currentStudentDetails = { ...student }; // Load existing details if found
        } else {
          // If no data exists, initialize with a new ID and username
          this.currentStudentDetails.id = studentId;
          this.currentStudentDetails.name = loggedInUser.username;
          // Set default age for new student if not loaded from data
          this.currentStudentDetails.age = 15; // Example default age
        }
      }
    }
  }

  /**
   * Handles the file input change event to capture the selected PDF file.
   * @param event The DOM change event.
   */
  setPdfFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the selected file
    } else {
      this.selectedFile = null; // Clear if no file selected
    }
  }

  /**
   * Saves the student's details and uploads the document if selected.
   */
  saveStudentDetails(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Store the file as a base64 data URL. In a real app, this would be uploaded to a server.
        this.currentStudentDetails.document = e.target.result;
        this.updateStudentData(); // Proceed to update student data after file is read
      };
      reader.readAsDataURL(this.selectedFile); // Read the file as a data URL
    } else {
      this.updateStudentData(); // If no file selected, just update student data
    }
  }

  /**
   * Private helper method to update student data in the DataService.
   */
  private updateStudentData(): void {
    // Check if it's a new student or an update
    if (this.currentStudentDetails.id === 0) {
      // This case should ideally be handled by auth service providing a valid ID on login
      // As a fallback, assign a new ID if somehow not set
      const newId = this.dataService.getNextStudentId();
      this.currentStudentDetails.id = newId;
      this.dataService.addStudent(this.currentStudentDetails);
      this.dataService.setNextStudentId(newId + 1); // Increment next ID
    } else {
      this.dataService.updateStudent(this.currentStudentDetails); // Update existing student
    }

    this.studentDashboardMessageSuccess = true;
    this.studentDashboardMessage = 'Details saved successfully!';
    // Clear the message after a few seconds
    setTimeout(() => {
      this.studentDashboardMessage = '';
    }, 3000);
  }
}