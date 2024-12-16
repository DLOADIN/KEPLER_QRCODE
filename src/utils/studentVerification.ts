import { Student } from '../types/student';
import { allowedStudents } from '../data/students';

export const verifyStudent = (studentId: string): { student?: Student; allowed: boolean } => {
  const student = allowedStudents.find(s => s.id === studentId);
  const allowed = student?.status === 'active';
  return { student, allowed };
};