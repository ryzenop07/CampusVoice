const express = require('express');
const { getColleges, getCollegeById } = require('../controllers/collegeController');
const router = express.Router();

router.get('/', getColleges);
router.get('/:id', getCollegeById);

module.exports = router;
