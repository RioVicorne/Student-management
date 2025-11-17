// Extended student types with more fields

export type Gender = 'male' | 'female' | 'other';

export type StudentStatus = 'active' | 'graduated' | 'suspended' | 'dropped' | 'leave';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface ParentInfo {
  fatherName?: string;
  fatherPhone?: string;
  fatherJob?: string;
  motherName?: string;
  motherPhone?: string;
  motherJob?: string;
}

export interface ExtendedStudent {
  // Basic info (existing)
  id: string;
  name: string;
  email: string;
  studentId: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  major: string;
  
  // NEW: Personal info
  avatar?: string;
  gender?: Gender;
  idCard?: string;              // CMND/CCCD
  placeOfBirth?: string;
  nationality?: string;
  ethnicity?: string;
  religion?: string;
  
  // NEW: Academic info
  academicYear?: string;        // K16, K17, K18...
  class?: string;               // CNTT01-K16
  enrollmentDate?: string;
  expectedGraduation?: string;
  status?: StudentStatus;
  gpa?: number;                 // 0.0 - 4.0
  totalCredits?: number;
  completedCredits?: number;
  advisor?: string;             // Giảng viên chủ nhiệm
  
  // NEW: Contact
  emergencyContact?: EmergencyContact;
  parentInfo?: ParentInfo;
  
  // NEW: Metadata
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
}

export type ExtendedStudentFormData = Omit<ExtendedStudent, 'id' | 'createdAt' | 'updatedAt'>;

