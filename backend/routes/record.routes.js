const express = require('express');
const router = express.Router();
const { getRecords, getRecordById } = require('../controllers/record.controller');
const { protect } = require('../middleware/auth.middleware');
const delayMiddleware = require('../middleware/delay.middleware');

// Apply delay middleware to all record routes (for async demo)
router.use(delayMiddleware);

// GET /api/records?delay=2000   → works with delay
// GET /api/records              → normal speed
router.get('/', protect, getRecords);
router.get('/:recordId', protect, getRecordById);

module.exports = router;