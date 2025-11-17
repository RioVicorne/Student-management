import { z } from 'zod';

// Vietnamese phone number regex (0 + 9 digits)
const vietnamesePhoneRegex = /^(0|\+84)[0-9]{9}$/;

// Student ID regex (example: SV001234 or 2024001234)
const studentIdRegex = /^(SV)?[0-9]{6,10}$/i;

export const studentSchema = z.object({
  name: z
    .string()
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ và tên không được quá 100 ký tự')
    .regex(/^[\p{L}\s]+$/u, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng'),
  
  studentId: z
    .string()
    .min(6, 'Mã sinh viên phải có ít nhất 6 ký tự')
    .max(15, 'Mã sinh viên không được quá 15 ký tự')
    .regex(studentIdRegex, 'Mã sinh viên không hợp lệ (VD: SV001234 hoặc 2024001234)'),
  
  email: z
    .string()
    .email('Email không hợp lệ')
    .min(5, 'Email quá ngắn')
    .max(100, 'Email quá dài')
    .toLowerCase(),
  
  phone: z
    .string()
    .regex(vietnamesePhoneRegex, 'Số điện thoại phải có định dạng 0XXXXXXXXX hoặc +84XXXXXXXXX'),
  
  address: z
    .string()
    .min(10, 'Địa chỉ phải có ít nhất 10 ký tự')
    .max(200, 'Địa chỉ không được quá 200 ký tự'),
  
  dateOfBirth: z
    .string()
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 16 && age <= 100;
    }, 'Sinh viên phải từ 16 đến 100 tuổi'),
  
  major: z
    .string()
    .min(1, 'Vui lòng chọn chuyên ngành'),
});

export type StudentFormSchema = z.infer<typeof studentSchema>;

// Helper function to validate and return errors
export function validateStudent(data: unknown) {
  const result = studentSchema.safeParse(data);
  
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((error) => {
      const path = error.path.join('.');
      errors[path] = error.message;
    });
    return { success: false, errors };
  }
  
  return { success: true, data: result.data };
}

