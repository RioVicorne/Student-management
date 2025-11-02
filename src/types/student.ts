export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  major: string;
}

export type StudentFormData = Omit<Student, 'id'>;

