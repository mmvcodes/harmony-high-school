// src/app/pages/teacher-dashboard/teacher-dashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { DataService } from '../../services/data'; // Corrected: Import from data.ts

// Define the interface for a Student object (re-used from manage-students)
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
  selector: 'app-teacher-dashboard', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './teacher-dashboard.html', // Corrected: Path to the component's HTML template is now 'teacher-dashboard.html'
  styleUrls: [] // No specific styles needed for this component
})
export class TeacherDashboard implements OnInit { // Corrected: Class name is 'TeacherDashboard'
  students: Student[] = []; // Array to hold the list of students
  teacherMessage: string = ''; // Message to display status (e.g., grades submitted)
  teacherMessageSuccess: boolean = false; // Flag to control message styling

  // Inject the DataService
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Lifecycle hook: called once after the component is initialized
    this.students = this.dataService.getStudents(); // Load all students for the teacher dashboard
  }

  /**
   * Simulates downloading a student's document.
   * In a real application, this would involve fetching the file from a server.
   * For base64 data URLs, it attempts to open/download in the browser.
   * @param documentUrl The base64 data URL of the document.
   */
  downloadDocument(documentUrl: string | undefined): void {
    if (documentUrl) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = documentUrl;
      // Suggest a filename. For base64, this might just be a generic name.
      link.download = `student_document_${new Date().getTime()}.pdf`;
      link.target = '_blank'; // Open in a new tab
      document.body.appendChild(link);
      link.click(); // Programmatically click the link
      document.body.removeChild(link); // Remove the temporary link
    } else {
      // Use a custom message box instead of alert()
      this.teacherMessageSuccess = false;
      this.teacherMessage = 'No document available for this student.';
      setTimeout(() => { this.teacherMessage = ''; }, 3000);
    }
  }

  /**
   * Submits all grades entered by the teacher.
   * In a real application, this would send data to a backend API.
   */
  submitGrades(): void {
    // Iterate through students and update their grades in the DataService
    this.students.forEach(student => {
      this.dataService.updateStudent(student); // Update each student's grade
    });

    this.teacherMessageSuccess = true;
    this.teacherMessage = 'Grades submitted successfully!';
    // Clear the message after a few seconds
    setTimeout(() => {
      this.teacherMessage = '';
    }, 3000);
  }
}