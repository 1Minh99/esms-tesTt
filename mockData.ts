import { Student, InterfaceStatus } from './types';

export const MOCK_STUDENTS: Student[] = [
  {
    id: '2301293A',
    name: 'Tan Wei Ming',
    nric: 'T0512345A',
    course: 'Dip. in Information Technology',
    year: 1,
    gpa: 3.8,
    attendance: 98,
    financeStatus: 'Paid',
    outstandingAmount: 0,
    riskLevel: 'Low',
    cmsRecords: []
  },
  {
    id: '2204567B',
    name: 'Sarah Lim Xiu Hui',
    nric: 'T0498765B',
    course: 'Dip. in Business',
    year: 2,
    gpa: 2.4,
    attendance: 82,
    financeStatus: 'Outstanding',
    outstandingAmount: 1450.50,
    riskLevel: 'High',
    cmsRecords: [
      {
        id: 'CMS-2023-001',
        type: 'Counselling',
        date: '2023-10-15',
        severity: 'Medium',
        summary: 'Student expressed anxiety regarding financial difficulties at home.',
        encryptedData: 'U2FsdGVkX1+...',
        officer: 'Mrs. Wong'
      },
      {
        id: 'CMS-2023-089',
        type: 'Disciplinary',
        date: '2023-09-01',
        severity: 'Low',
        summary: 'Caught vaping on campus premises.',
        encryptedData: 'U2FsdGVkX1+...',
        officer: 'Mr. Teo'
      }
    ]
  },
  {
    id: '2103321C',
    name: 'Muthu Kumar',
    nric: 'T0355566C',
    course: 'Dip. in Engineering',
    year: 3,
    gpa: 3.1,
    attendance: 92,
    financeStatus: 'Paid',
    outstandingAmount: 0,
    riskLevel: 'Medium',
    cmsRecords: [
      {
        id: 'CMS-2022-112',
        type: 'Medical',
        date: '2022-04-20',
        severity: 'Medium',
        summary: 'Declared condition: Asthma. Requires inhaler.',
        encryptedData: 'U2FsdGVkX1+...',
        officer: 'Nurse Jenny'
      }
    ]
  }
];

export const MOCK_INTERFACES: InterfaceStatus[] = [
  { name: 'SingPass Auth', status: 'Operational', latency: 45, lastSync: 'Just now', type: 'Public' },
  { name: 'MyInfo Data', status: 'Operational', latency: 120, lastSync: '2 mins ago', type: 'Public' },
  { name: 'MOE Data Exchange', status: 'Operational', latency: 85, lastSync: '10 mins ago', type: 'Public' },
  { name: 'Workday (Finance)', status: 'Degraded', latency: 450, lastSync: '1 hour ago', type: 'Internal' },
  { name: 'TPSS (Timetable)', status: 'Operational', latency: 30, lastSync: '5 mins ago', type: 'Internal' },
  { name: 'Azure AD', status: 'Operational', latency: 20, lastSync: 'Real-time', type: 'Internal' }
];
