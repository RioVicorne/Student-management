import { Student } from '@/types/student';

export function exportToJSON(students: Student[]): string {
  return JSON.stringify(students, null, 2);
}

export function exportToCSV(students: Student[]): string {
  if (students.length === 0) return '';

  const headers = ['ID', 'Mã SV', 'Họ và tên', 'Email', 'Số điện thoại', 'Địa chỉ', 'Ngày sinh', 'Chuyên ngành'];
  const rows = students.map((student) => [
    student.id,
    student.studentId,
    student.name,
    student.email,
    student.phone,
    student.address,
    student.dateOfBirth,
    student.major,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importFromJSON(jsonString: string): Student[] {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      return parsed as Student[];
    }
    throw new Error('Invalid JSON format');
  } catch (error) {
    throw new Error('Failed to parse JSON: ' + (error as Error).message);
  }
}

export function importFromCSV(csvString: string): Student[] {
  try {
    const lines = csvString.split('\n').filter((line) => line.trim());
    if (lines.length < 2) {
      throw new Error('CSV file is empty or has no data');
    }

    const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''));
    const dataLines = lines.slice(1);

    return dataLines.map((line, index) => {
      const values = line.split(',').map((v) => v.trim().replace(/"/g, ''));
      
      // Find indices for required fields
      const idIndex = headers.findIndex((h) => h.toLowerCase() === 'id');
      const studentIdIndex = headers.findIndex((h) => h.toLowerCase().includes('mã') || h.toLowerCase().includes('id'));
      const nameIndex = headers.findIndex((h) => h.toLowerCase().includes('tên') || h.toLowerCase().includes('name'));
      const emailIndex = headers.findIndex((h) => h.toLowerCase() === 'email');
      const phoneIndex = headers.findIndex((h) => h.toLowerCase().includes('phone') || h.toLowerCase().includes('điện'));
      const addressIndex = headers.findIndex((h) => h.toLowerCase().includes('address') || h.toLowerCase().includes('địa'));
      const dobIndex = headers.findIndex((h) => h.toLowerCase().includes('date') || h.toLowerCase().includes('sinh'));
      const majorIndex = headers.findIndex((h) => h.toLowerCase().includes('major') || h.toLowerCase().includes('ngành'));

      return {
        id: idIndex >= 0 && values[idIndex] ? values[idIndex] : Date.now().toString() + index,
        studentId: studentIdIndex >= 0 ? values[studentIdIndex] || '' : '',
        name: nameIndex >= 0 ? values[nameIndex] || '' : '',
        email: emailIndex >= 0 ? values[emailIndex] || '' : '',
        phone: phoneIndex >= 0 ? values[phoneIndex] || '' : '',
        address: addressIndex >= 0 ? values[addressIndex] || '' : '',
        dateOfBirth: dobIndex >= 0 ? values[dobIndex] || '' : '',
        major: majorIndex >= 0 ? values[majorIndex] || '' : '',
      } as Student;
    }).filter((student) => student.name && student.studentId); // Filter out invalid entries
  } catch (error) {
    throw new Error('Failed to parse CSV: ' + (error as Error).message);
  }
}

