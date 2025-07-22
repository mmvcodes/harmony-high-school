// src/app/pages/contact/contact.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for standalone components
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-contact', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule for form handling
  templateUrl: './contact.html', // Path to the component's HTML template
  styleUrls: [] // No specific styles needed for this component
})
export class Contact {
  // Properties for contact information
  schoolName: string = 'Harmony High School';
  address: string = '100, MG Road, Bengaluru, Karnataka 560001, India'; // Updated to a Bangalore address
  phone: string = '+91 (80) 1234-5678'; // Updated to an Indian phone number format
  email: string = 'info@harmonyhigh.edu';

  // Properties for the contact form
  contactForm = {
    name: '',
    email: '',
    subject: '', // Added subject field
    message: ''
  };
  formMessage: string = ''; // Message to display after form submission
  formMessageSuccess: boolean = false; // Flag for message styling

  constructor() {}

  /**
   * Handles the contact form submission.
   * This is a mock submission; in a real application, this would send data to a backend.
   */
  submitContactForm(): void {
    // Basic validation
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.subject || !this.contactForm.message) {
      this.formMessageSuccess = false;
      this.formMessage = 'Please fill in all fields.';
      return;
    }

    // Simulate sending data (e.g., to a console log)
    console.log('Contact Form Submitted:', this.contactForm);

    // Display success message
    this.formMessageSuccess = true;
    this.formMessage = 'Thank you for your message! We will get back to you soon.';

    // Reset the form after successful submission
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    // Clear the message after a few seconds
    setTimeout(() => {
      this.formMessage = '';
    }, 5000);
  }
}
