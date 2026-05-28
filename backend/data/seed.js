require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Record = require('../models/Record.model');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB Connected for seeding');
};

const users = [
  {
    userId: 'ADM001',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@mploychek.com',
    password: 'admin123',
    role: 'Admin',
    department: 'HR Operations',
    phone: '+91-9876543210',
  },
  {
    userId: 'ADM002',
    name: 'Priya Nair',
    email: 'priya.nair@mploychek.com',
    password: 'admin123',
    role: 'Admin',
    department: 'Compliance',
    phone: '+91-9876543211',
  },
  {
    userId: 'USR001',
    name: 'Siddharth Kumar',
    email: 'siddharth.kumar@mploychek.com',
    password: 'user123',
    role: 'General User',
    department: 'Engineering',
    phone: '+91-9876543212',
  },
  {
    userId: 'USR002',
    name: 'Anjali Mehta',
    email: 'anjali.mehta@mploychek.com',
    password: 'user123',
    role: 'General User',
    department: 'Finance',
    phone: '+91-9876543213',
  },
  {
    userId: 'USR003',
    name: 'Karan Verma',
    email: 'karan.verma@mploychek.com',
    password: 'user123',
    role: 'General User',
    department: 'Sales',
    phone: '+91-9876543214',
  },
];

const records = [
  // Siddharth's records
  {
    recordId: 'REC-001',
    userId: 'USR001',
    candidateName: 'Siddharth Kumar',
    checkType: 'Identity Verification',
    status: 'Completed',
    priority: 'High',
    assignedTo: 'ADM001',
    reportUrl: 'https://reports.mploychek.com/REC-001.pdf',
    internalNotes: 'Aadhaar and PAN verified successfully.',
    completedAt: new Date('2026-05-10'),
  },
  {
    recordId: 'REC-002',
    userId: 'USR001',
    candidateName: 'Siddharth Kumar',
    checkType: 'Employment History',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'ADM001',
    reportUrl: '',
    internalNotes: 'Awaiting response from previous employer (TCS).',
    completedAt: null,
  },
  {
    recordId: 'REC-003',
    userId: 'USR001',
    candidateName: 'Siddharth Kumar',
    checkType: 'Education Verification',
    status: 'Completed',
    priority: 'Low',
    assignedTo: 'ADM002',
    reportUrl: 'https://reports.mploychek.com/REC-003.pdf',
    internalNotes: 'B.Tech from NIT verified.',
    completedAt: new Date('2026-05-12'),
  },
  // Anjali's records
  {
    recordId: 'REC-004',
    userId: 'USR002',
    candidateName: 'Anjali Mehta',
    checkType: 'Criminal Record',
    status: 'Completed',
    priority: 'Critical',
    assignedTo: 'ADM001',
    reportUrl: 'https://reports.mploychek.com/REC-004.pdf',
    internalNotes: 'No criminal history found.',
    completedAt: new Date('2026-05-08'),
  },
  {
    recordId: 'REC-005',
    userId: 'USR002',
    candidateName: 'Anjali Mehta',
    checkType: 'Credit Check',
    status: 'Pending',
    priority: 'Medium',
    assignedTo: '',
    reportUrl: '',
    internalNotes: 'Not yet initiated.',
    completedAt: null,
  },
  // Karan's records
  {
    recordId: 'REC-006',
    userId: 'USR003',
    candidateName: 'Karan Verma',
    checkType: 'Reference Check',
    status: 'On Hold',
    priority: 'Low',
    assignedTo: 'ADM002',
    reportUrl: '',
    internalNotes: 'Candidate requested delay. Resume after June 1.',
    completedAt: null,
  },
  {
    recordId: 'REC-007',
    userId: 'USR003',
    candidateName: 'Karan Verma',
    checkType: 'Identity Verification',
    status: 'Failed',
    priority: 'High',
    assignedTo: 'ADM001',
    reportUrl: 'https://reports.mploychek.com/REC-007.pdf',
    internalNotes: 'Address mismatch found in documents.',
    completedAt: new Date('2026-05-15'),
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Record.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert users
    for (const u of users) { await new User(u).save(); }
    console.log(`👤 Seeded ${users.length} users`);

    // Insert records
    await Record.insertMany(records);
    console.log(`📋 Seeded ${records.length} records`);

    console.log('\n🎉 Seed complete! Login credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:        ADM001 / admin123');
    console.log('Admin:        ADM002 / admin123');
    console.log('General User: USR001 / user123');
    console.log('General User: USR002 / user123');
    console.log('General User: USR003 / user123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedDB();
