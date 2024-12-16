export interface Student {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

export interface ScanResult {
  student?: Student;
  allowed: boolean;
}