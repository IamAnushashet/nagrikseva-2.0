import {
  BadgeIndianRupee,
  Building2,
  FileBadge2,
  HeartPulse,
  Landmark,
  Scale,
  ShieldCheck,
  Sprout,
  Truck,
} from 'lucide-react';

export const serviceCategories = [
  {
    id: 'identity',
    title: 'Identity & Certificates',
    description: 'Birth, residence, income, caste, domicile, and senior citizen certificates.',
    icon: FileBadge2,
    color: 'text-civic-700 bg-civic-50',
  },
  {
    id: 'welfare',
    title: 'Welfare Benefits',
    description: 'Pension, scholarships, family assistance, and targeted benefit schemes.',
    icon: ShieldCheck,
    color: 'text-saffron-600 bg-saffron-50',
  },
  {
    id: 'health',
    title: 'Public Health',
    description: 'Health cards, clinic appointments, insurance support, and vaccination records.',
    icon: HeartPulse,
    color: 'text-rose-700 bg-rose-50',
  },
  {
    id: 'tax',
    title: 'Tax & Payments',
    description: 'Property tax, challans, utility payments, and municipal dues.',
    icon: BadgeIndianRupee,
    color: 'text-emerald-700 bg-emerald-50',
  },
  {
    id: 'land',
    title: 'Land & Revenue',
    description: 'Land records, mutation requests, encumbrance certificates, and survey support.',
    icon: Landmark,
    color: 'text-indigo-700 bg-indigo-50',
  },
  {
    id: 'civic',
    title: 'Civic Services',
    description: 'Licenses, permits, sanitation, roads, water supply, and local works.',
    icon: Building2,
    color: 'text-sky-700 bg-sky-50',
  },
  {
    id: 'transport',
    title: 'Transport',
    description: 'Driving license services, vehicle permits, fee receipts, and route permissions.',
    icon: Truck,
    color: 'text-amber-700 bg-amber-50',
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    description: 'Farmer registration, subsidy applications, crop support, and equipment schemes.',
    icon: Sprout,
    color: 'text-lime-700 bg-lime-50',
  },
  {
    id: 'legal',
    title: 'Legal Aid',
    description: 'Case assistance, grievance escalation, and public legal service requests.',
    icon: Scale,
    color: 'text-violet-700 bg-violet-50',
  },
];

export const citizenProfile = {
  name: 'Ananya Sharma',
  citizenId: 'NS2-CIT-48291',
  district: 'Pune Urban',
  mobile: '+91 98XX XX4312',
  verified: true,
};

export const applications = [
  {
    id: 'APP-2026-01428',
    service: 'Income Certificate',
    department: 'Revenue Department',
    submittedOn: '28 May 2026',
    status: 'In Review',
    officer: 'R. Kulkarni',
    eta: '2 working days',
    progress: 58,
  },
  {
    id: 'APP-2026-01205',
    service: 'Property Tax Name Transfer',
    department: 'Municipal Corporation',
    submittedOn: '22 May 2026',
    status: 'Documents Requested',
    officer: 'S. Patil',
    eta: 'Awaiting citizen action',
    progress: 42,
  },
  {
    id: 'APP-2026-01072',
    service: 'Senior Citizen Card',
    department: 'Social Welfare',
    submittedOn: '16 May 2026',
    status: 'Approved',
    officer: 'M. Shaikh',
    eta: 'Certificate issued',
    progress: 100,
  },
];

export const timeline = [
  {
    title: 'Application Submitted',
    date: '28 May 2026, 10:24 AM',
    description: 'Citizen details and supporting documents were received.',
    state: 'complete',
  },
  {
    title: 'Auto Verification',
    date: '28 May 2026, 10:41 AM',
    description: 'Identity and address records matched successfully with government registries.',
    state: 'complete',
  },
  {
    title: 'Officer Review',
    date: '29 May 2026, 04:18 PM',
    description: 'Revenue officer is validating submitted income documents.',
    state: 'current',
  },
  {
    title: 'Approval & Issuance',
    date: 'Expected by 6 Jun 2026',
    description: 'Digitally signed certificate will be available in the citizen locker.',
    state: 'pending',
  },
];

export const complaints = [
  {
    id: 'CMP-90012',
    category: 'Water Supply',
    location: 'Ward 11',
    status: 'Assigned',
    severity: 'Medium',
  },
  {
    id: 'CMP-90008',
    category: 'Street Light',
    location: 'Kothrud Main Road',
    status: 'Resolved',
    severity: 'Low',
  },
];

export const aiResponses = {
  certificate:
    'For an income or residence certificate, open Apply for Service, choose Identity & Certificates, upload address proof and income documents, then submit. Most verified applications are processed in 3 to 5 working days.',
  status:
    'You can track any application using its application ID. The current mock application APP-2026-01428 is in officer review and is expected within 2 working days.',
  complaint:
    'To register a complaint, choose the complaint category, add location details, upload a photo if available, and submit. You will receive a complaint ID for follow-up.',
  login:
    'Citizens can sign in with mobile OTP, Citizen ID, or a verified digital identity provider. This prototype uses mock login only.',
};
