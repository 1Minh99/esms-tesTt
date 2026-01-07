export enum UserRole {
  ADMIN = 'System Admin',
  LECTURER = 'Lecturer',
  COUNSELLOR = 'Counsellor',
  FINANCE_OFFICER = 'Finance Officer'
}

export enum ModuleType {
  DASHBOARD = 'Dashboard',
  ENROLMENT = 'Enrolment',
  COURSE_MGMT = 'Course Mgmt',
  STUDENT_ADMIN = 'Student Admin',
  FINANCE = 'Student Finance',
  ATTENDANCE = 'Attendance',
  ASSESSMENT = 'Assessment',
  CMS = 'Case Management (CMS)'
}

export interface Student {
  id: string; // Admission Number
  name: string;
  nric: string; // Sensitive
  course: string;
  year: number;
  gpa: number;
  attendance: number;
  financeStatus: 'Paid' | 'Outstanding' | 'Overdue';
  outstandingAmount: number;
  riskLevel: 'Low' | 'Medium' | 'High'; // Derived from CMS
  cmsRecords: CMSRecord[];
}

export interface CMSRecord {
  id: string;
  type: 'Disciplinary' | 'Counselling' | 'Medical' | 'SEN';
  date: string;
  severity: 'Low' | 'Medium' | 'High';
  summary: string; // Sensitive
  encryptedData: string; // Simulating AES-256 field
  officer: string;
}

export interface InterfaceStatus {
  name: string;
  status: 'Operational' | 'Degraded' | 'Down';
  latency: number;
  lastSync: string;
  type: 'Public' | 'Internal';
}
