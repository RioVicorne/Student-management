'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Student, StudentFormData } from '@/types/student';

interface StudentContextType {
  students: Student[];
  addStudent: (student: StudentFormData) => void;
  updateStudent: (id: string, student: StudentFormData) => void;
  deleteStudent: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
  importStudents: (students: Student[]) => void;
  exportStudents: () => string;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const STORAGE_KEY = 'students_data';

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setStudents(parsed);
        }
      } catch (error) {
        console.error('Error loading students from localStorage:', error);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever students change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
      } catch (error) {
        console.error('Error saving students to localStorage:', error);
      }
    }
  }, [students, isLoaded]);

  const addStudent = useCallback((student: StudentFormData) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
    };
    setStudents((prev) => [...prev, newStudent]);
  }, []);

  const updateStudent = useCallback((id: string, student: StudentFormData) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...student, id } : s))
    );
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const getStudentById = useCallback(
    (id: string) => {
      return students.find((s) => s.id === id);
    },
    [students]
  );

  const importStudents = useCallback((newStudents: Student[]) => {
    setStudents(newStudents);
  }, []);

  const exportStudents = useCallback(() => {
    return JSON.stringify(students, null, 2);
  }, [students]);

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentById,
        importStudents,
        exportStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}

