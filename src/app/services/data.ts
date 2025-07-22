// src/app/services/data.ts
import { Injectable } from '@angular/core';

// Define interfaces for data structures
interface Student {
  id: number;
  name: string;
  age: number;
  class: string;
  section: string;
  course: string;
  document?: string; // Base64 string or URL for PDF document
  grade?: string;     // Student's grade
}

interface Teacher {
  id: number;
  name: string;
  subject: string;
  experience: number;
  qualification: string;
  contact: string;
}

@Injectable({
  providedIn: 'root' // Makes this service a singleton and available throughout the app
})
export class DataService { // Class name remains DataService
  private studentsKey = 'harmonyStudents'; // Key for storing students array in localStorage
  private teachersKey = 'harmonyTeachers'; // Key for storing teachers array in localStorage
  private nextStudentIdKey = 'nextStudentId'; // Key for tracking next student ID
  private nextTeacherIdKey = 'nextTeacherId'; // Key for tracking next teacher ID

  constructor() {
    // Initialize localStorage with empty arrays and starting IDs if they don't exist
    if (!localStorage.getItem(this.studentsKey)) {
      localStorage.setItem(this.studentsKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.teachersKey)) {
      localStorage.setItem(this.teachersKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.nextStudentIdKey)) {
      localStorage.setItem(this.nextStudentIdKey, '1');
    }
    if (!localStorage.getItem(this.nextTeacherIdKey)) {
      localStorage.setItem(this.nextTeacherIdKey, '1');
    }
  }

  // --- Student Data Operations ---

  /**
   * Retrieves all students from local storage.
   * @returns An array of Student objects.
   */
  getStudents(): Student[] {
    return JSON.parse(localStorage.getItem(this.studentsKey) || '[]');
  }

  /**
   * Retrieves a single student by their ID.
   * @param id The ID of the student to retrieve.
   * @returns The Student object if found, otherwise undefined.
   */
  getStudentById(id: number): Student | undefined {
    const students = this.getStudents();
    return students.find(s => s.id === id);
  }

  /**
   * Adds a new student to local storage.
   * @param student The Student object to add.
   */
  addStudent(student: Student): void {
    const students = this.getStudents();
    students.push(student);
    localStorage.setItem(this.studentsKey, JSON.stringify(students));
  }

  /**
   * Updates an existing student in local storage.
   * @param updatedStudent The updated Student object.
   */
  updateStudent(updatedStudent: Student): void {
    let students = this.getStudents();
    const index = students.findIndex(s => s.id === updatedStudent.id);
    if (index > -1) {
      students[index] = updatedStudent; // Replace the old student object with the updated one
      localStorage.setItem(this.studentsKey, JSON.stringify(students));
    }
  }

  /**
   * Deletes a student from local storage by their ID.
   * @param id The ID of the student to delete.
   */
  deleteStudent(id: number): void {
    let students = this.getStudents();
    students = students.filter(s => s.id !== id); // Filter out the student to be deleted
    localStorage.setItem(this.studentsKey, JSON.stringify(students));
  }

  /**
   * Gets the next available student ID.
   * @returns The next student ID as a number.
   */
  getNextStudentId(): number {
    return parseInt(localStorage.getItem(this.nextStudentIdKey) || '1', 10);
  }

  /**
   * Sets the next available student ID.
   * @param id The ID to set as the next available.
   */
  setNextStudentId(id: number): void {
    localStorage.setItem(this.nextStudentIdKey, id.toString());
  }

  // --- Teacher Data Operations ---

  /**
   * Retrieves all teachers from local storage.
   * @returns An array of Teacher objects.
   */
  getTeachers(): Teacher[] {
    return JSON.parse(localStorage.getItem(this.teachersKey) || '[]');
  }

  /**
   * Retrieves a single teacher by their ID.
   * @param id The ID of the teacher to retrieve.
   * @returns The Teacher object if found, otherwise undefined.
   */
  getTeacherById(id: number): Teacher | undefined {
    const teachers = this.getTeachers();
    return teachers.find(t => t.id === id);
  }

  /**
   * Adds a new teacher to local storage.
   * @param teacher The Teacher object to add.
   */
  addTeacher(teacher: Teacher): void {
    const teachers = this.getTeachers();
    teachers.push(teacher);
    localStorage.setItem(this.teachersKey, JSON.stringify(teachers));
  }

  /**
   * Updates an existing teacher in local storage.
   * @param updatedTeacher The updated Teacher object.
   */
  updateTeacher(updatedTeacher: Teacher): void {
    let teachers = this.getTeachers();
    const index = teachers.findIndex(t => t.id === updatedTeacher.id);
    if (index > -1) {
      teachers[index] = updatedTeacher; // Replace the old teacher object with the updated one
      localStorage.setItem(this.teachersKey, JSON.stringify(teachers));
    }
  }

  /**
   * Deletes a teacher from local storage by their ID.
   * @param id The ID of the teacher to delete.
   */
  deleteTeacher(id: number): void {
    let teachers = this.getTeachers();
    teachers = teachers.filter(t => t.id !== id); // Filter out the teacher to be deleted
    localStorage.setItem(this.teachersKey, JSON.stringify(teachers));
  }

  /**
   * Gets the next available teacher ID.
   * @returns The next teacher ID as a number.
   */
  getNextTeacherId(): number {
    return parseInt(localStorage.getItem(this.nextTeacherIdKey) || '1', 10);
  }

  /**
   * Sets the next available teacher ID.
   * @param id The ID to set as the next available.
   */
  setNextTeacherId(id: number): void {
    localStorage.setItem(this.nextTeacherIdKey, id.toString());
  }
}