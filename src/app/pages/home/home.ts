// src/app/pages/home/home.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like *ngFor, *ngIf

@Component({
  selector: 'app-home', // HTML selector for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule], // Import CommonModule for directives like *ngFor, *ngIf
  templateUrl: './home.html', // Corrected: Path to the component's HTML template is now 'home.html'
  styleUrls: ['./home.scss'] // Styles specific to this component (can be empty if global styles are sufficient)
})
export class Home implements OnInit, OnDestroy { // Corrected: Class name is 'Home'
  // Array of image URLs for the slideshow
  images: string[] = [
    'https://cdn.pixabay.com/photo/2020/01/22/09/39/teacher-4784916_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/07/31/09/52/basketball-2557076_1280.jpg',
    'https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg',
    'https://cdn.pixabay.com/photo/2021/09/28/20/42/kids-6665603_1280.jpg'
  ];
  currentImageIndex: number = 0; // Index of the currently active image
  slideshowInterval: any; // Variable to hold the interval timer

  ngOnInit(): void {
    // Lifecycle hook: called once after the component is initialized
    this.startSlideshow(); // Start the image slideshow
  }

  ngOnDestroy(): void {
    // Lifecycle hook: called just before the component is destroyed
    // Clear the interval to prevent memory leaks when the component is removed from the DOM
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
    }
  }

  /**
   * Starts the image slideshow, changing the active image every 3 seconds.
   */
  startSlideshow(): void {
    this.slideshowInterval = setInterval(() => {
      // Increment the index, and loop back to 0 if it exceeds the number of images
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 3000); // Change image every 3 seconds (3000 milliseconds)
  }
}