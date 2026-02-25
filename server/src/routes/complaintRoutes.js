const express = require('express');
const { createComplaint, getComplaints, updateComplaintStatus, updateComplaintPriority, assignComplaint, addNote, addResponse, updateComplaint } = require('../controllers/complaintController');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, createComplaint);
router.get('/', protect, getComplaints);
router.put('/:id', protect, updateComplaint);
router.put('/:id/status', protect, adminOnly, updateComplaintStatus);
router.put('/:id/priority', protect, adminOnly, updateComplaintPriority);
router.put('/:id/assign', protect, adminOnly, assignComplaint);
router.post('/:id/notes', protect, adminOnly, addNote);
router.post('/:id/response', protect, adminOnly, addResponse);

module.exports = router;
