const Record = require('../models/Record.model');

// @desc    Get records for logged-in user (General User sees own, Admin sees all)
// @route   GET /api/records
// @access  Private
const getRecords = async (req, res) => {
  try {
    let query = {};
    let records;

    if (req.user.role === 'Admin') {
      // Admin sees all records — full data including sensitive fields
      records = await Record.find(query).sort({ createdAt: -1 });
    } else {
      // General User sees only their own records — limited fields
      records = await Record.find({ userId: req.user.userId })
        .select('-reportUrl -internalNotes') // hide admin-only fields
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      records,
      total: records.length,
      accessLevel: req.user.role,
    });
  } catch (error) {
    console.error('Get records error:', error);
    res.status(500).json({ message: 'Error fetching records' });
  }
};

// @desc    Get single record by ID
// @route   GET /api/records/:recordId
// @access  Private
const getRecordById = async (req, res) => {
  try {
    const record = await Record.findOne({ recordId: req.params.recordId });

    if (!record) return res.status(404).json({ message: 'Record not found' });

    // General user can only see their own record
    if (req.user.role !== 'Admin' && record.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Strip admin-only fields for general users
    if (req.user.role !== 'Admin') {
      const { reportUrl, internalNotes, ...safeRecord } = record.toObject();
      return res.status(200).json({ record: safeRecord });
    }

    res.status(200).json({ record });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching record' });
  }
};

module.exports = { getRecords, getRecordById };