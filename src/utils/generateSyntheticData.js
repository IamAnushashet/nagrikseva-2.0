import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, '..', 'data', 'generated');

let seed = 204826;
function random() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

function pick(items) {
  return items[Math.floor(random() * items.length)];
}

function pad(value, length) {
  return String(value).padStart(length, '0');
}

function numberBetween(min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}

const states = [
  {
    state: 'Maharashtra',
    districts: [
      { district: 'Pune', localities: ['Kothrud', 'Hadapsar', 'Aundh', 'Shivajinagar'], basePincode: 411001 },
      { district: 'Mumbai Suburban', localities: ['Andheri East', 'Borivali', 'Kurla', 'Chembur'], basePincode: 400001 },
      { district: 'Nagpur', localities: ['Dharampeth', 'Sitabuldi', 'Manewada', 'Mahal'], basePincode: 440001 },
    ],
  },
  {
    state: 'Karnataka',
    districts: [
      { district: 'Bengaluru Urban', localities: ['Jayanagar', 'Indiranagar', 'Yelahanka', 'Whitefield'], basePincode: 560001 },
      { district: 'Mysuru', localities: ['Vijayanagar', 'Kuvempunagar', 'Hebbal', 'Nazarbad'], basePincode: 570001 },
      { district: 'Dharwad', localities: ['Hubballi', 'Saptapur', 'Navanagar', 'Keshwapur'], basePincode: 580001 },
    ],
  },
  {
    state: 'Tamil Nadu',
    districts: [
      { district: 'Chennai', localities: ['T Nagar', 'Velachery', 'Anna Nagar', 'Adyar'], basePincode: 600001 },
      { district: 'Coimbatore', localities: ['RS Puram', 'Peelamedu', 'Gandhipuram', 'Saibaba Colony'], basePincode: 641001 },
      { district: 'Madurai', localities: ['Anna Nagar', 'KK Nagar', 'Tallakulam', 'Simmakkal'], basePincode: 625001 },
    ],
  },
  {
    state: 'Uttar Pradesh',
    districts: [
      { district: 'Lucknow', localities: ['Gomti Nagar', 'Aliganj', 'Hazratganj', 'Indira Nagar'], basePincode: 226001 },
      { district: 'Varanasi', localities: ['Sigra', 'Lanka', 'Bhelupur', 'Cantonment'], basePincode: 221001 },
      { district: 'Noida', localities: ['Sector 62', 'Sector 18', 'Sector 137', 'Greater Noida West'], basePincode: 201301 },
    ],
  },
  {
    state: 'Delhi',
    districts: [
      { district: 'New Delhi', localities: ['Karol Bagh', 'Lajpat Nagar', 'Dwarka', 'Rohini'], basePincode: 110001 },
      { district: 'South Delhi', localities: ['Saket', 'Hauz Khas', 'Mehrauli', 'Kalkaji'], basePincode: 110016 },
      { district: 'East Delhi', localities: ['Mayur Vihar', 'Preet Vihar', 'Laxmi Nagar', 'Shahdara'], basePincode: 110092 },
    ],
  },
  {
    state: 'Gujarat',
    districts: [
      { district: 'Ahmedabad', localities: ['Navrangpura', 'Maninagar', 'Satellite', 'Bopal'], basePincode: 380001 },
      { district: 'Surat', localities: ['Adajan', 'Varachha', 'Vesu', 'Katargam'], basePincode: 395001 },
      { district: 'Vadodara', localities: ['Alkapuri', 'Gotri', 'Fatehgunj', 'Manjalpur'], basePincode: 390001 },
    ],
  },
];

const firstNames = [
  'Aarav',
  'Vivaan',
  'Aditya',
  'Ishaan',
  'Arjun',
  'Sai',
  'Rohan',
  'Kabir',
  'Ananya',
  'Diya',
  'Isha',
  'Meera',
  'Aditi',
  'Kavya',
  'Nisha',
  'Priya',
  'Sanjay',
  'Ramesh',
  'Suresh',
  'Farhan',
  'Ayesha',
  'Lakshmi',
  'Karthik',
  'Sneha',
  'Vikram',
  'Pooja',
  'Naveen',
  'Divya',
];

const lastNames = [
  'Sharma',
  'Verma',
  'Patel',
  'Reddy',
  'Iyer',
  'Nair',
  'Khan',
  'Shaikh',
  'Mishra',
  'Singh',
  'Yadav',
  'Kulkarni',
  'Joshi',
  'Gowda',
  'Pillai',
  'Das',
  'Mehta',
  'Choudhary',
  'Gupta',
  'Bhat',
];

const services = [
  ['Income Certificate', 'Revenue Department'],
  ['Domicile Certificate', 'Revenue Department'],
  ['Caste Certificate', 'Social Justice Department'],
  ['Property Tax Mutation', 'Municipal Corporation'],
  ['Senior Citizen Card', 'Social Welfare Department'],
  ['Birth Certificate Correction', 'Municipal Corporation'],
  ['Water Connection', 'Urban Local Body'],
  ['Trade License Renewal', 'Municipal Licensing'],
  ['Scholarship Verification', 'Education Department'],
  ['Farmer Subsidy Registration', 'Agriculture Department'],
];

const complaintTypes = [
  'Water supply disruption',
  'Street light not working',
  'Garbage not collected',
  'Road pothole',
  'Drainage overflow',
  'Stray waste dumping',
  'Public toilet maintenance',
  'Noise complaint',
  'Illegal parking',
  'Tree trimming request',
];

const statuses = ['Submitted', 'In Review', 'Documents Requested', 'Field Verification', 'Approved', 'Rejected'];
const complaintStatuses = ['New', 'Assigned', 'In Progress', 'Resolved', 'Escalated'];

function locationFor(index) {
  const state = states[index % states.length];
  const districtEntry = state.districts[numberBetween(0, state.districts.length - 1)];
  const locality = pick(districtEntry.localities);
  return {
    state: state.state,
    district: districtEntry.district,
    locality,
    pincode: String(districtEntry.basePincode + numberBetween(0, 98)),
  };
}

function aadhaarMasked(index) {
  return `XXXX-XXXX-${pad(1000 + index, 4)}`;
}

function pan(index, lastName) {
  const letter = lastName.slice(0, 1).toUpperCase();
  return `NSV${letter}${pad(1000 + index, 4)}${String.fromCharCode(65 + (index % 26))}`;
}

function dateInJune(offset) {
  return `2026-06-${pad(1 + (offset % 28), 2)}`;
}

const citizens = Array.from({ length: 1000 }, (_, index) => {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const location = locationFor(index);
  const deceasedFlag = index % 137 === 0;

  return {
    id: `NS2-CIT-${pad(index + 1, 5)}`,
    name: `${firstName} ${lastName}`,
    gender: index % 3 === 0 ? 'Female' : index % 3 === 1 ? 'Male' : 'Other',
    age: numberBetween(18, 82),
    mobile: `+91 ${numberBetween(70000, 99999)} ${numberBetween(10000, 99999)}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 1}@example.in`,
    address: {
      line1: `${numberBetween(1, 240)}, ${location.locality} Main Road`,
      ...location,
    },
    aadhaarMasked: aadhaarMasked(index + 1),
    pan: pan(index + 1, lastName),
    languagePreference: pick(['English', 'Hindi', 'Kannada', 'Tamil']),
    verification: {
      aadhaar: index % 11 === 0 ? 'Pending' : 'Verified',
      pan: index % 13 === 0 ? 'Mismatch' : 'Verified',
      digilocker: index % 5 === 0 ? 'Not Linked' : 'Linked',
    },
    accountStatus: deceasedFlag ? 'Deactivation Review' : 'Active',
    deceasedSimulation: {
      flagged: deceasedFlag,
      source: deceasedFlag ? 'Civil Registration System mock sync' : null,
      flaggedOn: deceasedFlag ? dateInJune(index) : null,
    },
  };
});

const applications = Array.from({ length: 5000 }, (_, index) => {
  const citizen = citizens[index % citizens.length];
  const [service, department] = pick(services);
  const status = pick(statuses);
  const progressMap = {
    Submitted: 18,
    'In Review': 48,
    'Documents Requested': 36,
    'Field Verification': 66,
    Approved: 100,
    Rejected: 100,
  };

  return {
    id: `APP-2026-${pad(index + 1, 5)}`,
    citizenId: citizen.id,
    citizenName: citizen.name,
    service,
    department,
    submittedOn: dateInJune(index),
    deadline: dateInJune(index + numberBetween(4, 18)),
    status,
    officer: `${pick(firstNames)} ${pick(lastNames)}`,
    district: citizen.address.district,
    state: citizen.address.state,
    pincode: citizen.address.pincode,
    progress: progressMap[status],
    riskLevel: status === 'Documents Requested' || status === 'Rejected' ? 'Attention' : pick(['Normal', 'Normal', 'Priority']),
  };
});

const complaints = Array.from({ length: 3000 }, (_, index) => {
  const citizen = citizens[(index * 7) % citizens.length];
  const category = pick(complaintTypes);
  const status = pick(complaintStatuses);

  return {
    id: `CMP-2026-${pad(index + 1, 5)}`,
    citizenId: citizen.id,
    citizenName: citizen.name,
    category,
    locality: citizen.address.locality,
    district: citizen.address.district,
    state: citizen.address.state,
    pincode: citizen.address.pincode,
    status,
    severity: pick(['Low', 'Medium', 'High']),
    submittedOn: dateInJune(index + 2),
    assignedWard: `Ward ${numberBetween(1, 72)}`,
    slaHours: pick([24, 48, 72, 96]),
  };
});

const identityRecords = citizens.map((citizen, index) => ({
  citizenId: citizen.id,
  aadhaar: {
    maskedNumber: citizen.aadhaarMasked,
    status: citizen.verification.aadhaar,
    lastVerifiedOn: dateInJune(index + 1),
  },
  pan: {
    number: citizen.pan,
    status: citizen.verification.pan,
    nameMatchScore: citizen.verification.pan === 'Verified' ? numberBetween(91, 100) : numberBetween(62, 78),
  },
  digilocker: {
    status: citizen.verification.digilocker,
    lockerId: citizen.verification.digilocker === 'Linked' ? `DL-${pad(500000 + index, 7)}` : null,
    documents: citizen.verification.digilocker === 'Linked' ? ['Aadhaar XML', 'PAN Card', 'Driving License'] : [],
  },
}));

const localityMap = complaints.reduce((acc, complaint) => {
  const key = `${complaint.locality}, ${complaint.district}`;
  acc[key] ||= {
    locality: complaint.locality,
    district: complaint.district,
    state: complaint.state,
    totalComplaints: 0,
    highSeverity: 0,
    categories: {},
  };
  acc[key].totalComplaints += 1;
  if (complaint.severity === 'High') acc[key].highSeverity += 1;
  acc[key].categories[complaint.category] = (acc[key].categories[complaint.category] || 0) + 1;
  return acc;
}, {});

const localityIntelligence = Object.values(localityMap)
  .map((item) => {
    const topIssue = Object.entries(item.categories).sort((a, b) => b[1] - a[1])[0];
    const ratio = item.highSeverity / item.totalComplaints;
    return {
      locality: item.locality,
      district: item.district,
      state: item.state,
      totalComplaints: item.totalComplaints,
      topIssue: topIssue[0],
      topIssueCount: topIssue[1],
      riskSignal: ratio > 0.36 ? 'High escalation probability' : ratio > 0.24 ? 'Monitor closely' : 'Normal civic load',
      suggestion: `${topIssue[0]} is trending in ${item.locality}. Prioritise ward crew allocation and citizen notifications.`,
    };
  })
  .sort((a, b) => b.totalComplaints - a.totalComplaints);

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'citizens.json'), `${JSON.stringify(citizens, null, 2)}\n`);
writeFileSync(join(outputDir, 'applications.json'), `${JSON.stringify(applications, null, 2)}\n`);
writeFileSync(join(outputDir, 'complaints.json'), `${JSON.stringify(complaints, null, 2)}\n`);
writeFileSync(join(outputDir, 'identityRecords.json'), `${JSON.stringify(identityRecords, null, 2)}\n`);
writeFileSync(join(outputDir, 'localityIntelligence.json'), `${JSON.stringify(localityIntelligence, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      citizens: citizens.length,
      applications: applications.length,
      complaints: complaints.length,
      identityRecords: identityRecords.length,
      localityIntelligence: localityIntelligence.length,
      outputDir,
    },
    null,
    2,
  ),
);
