const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
  {
    recordId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    candidateName: {
      type: String,
      required: true,
    },
    checkType: {
      type: String,
      enum: [
        'Identity Verification',
        'Employment History',
        'Criminal Record',
        'Education Verification',
        'Credit Check',
        'Reference Check',
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Failed', 'On Hold'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    assignedTo: {
      type: String,
      default: '',
    },
    // Admin-only sensitive fields
    reportUrl: {
      type: String,
      default: '',
    },
    internalNotes: {
      type: String,
      default: '',
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Record', recordSchema);