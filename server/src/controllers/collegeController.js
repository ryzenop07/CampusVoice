const College = require('../models/College');

exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find().select('-__v');
    const formattedColleges = colleges.map(c => ({
      id: c._id.toString(),
      name: c.name,
      code: c.code,
      emailDomain: c.emailDomain,
      departments: c.departments,
      createdAt: c.createdAt
    }));
    res.json({ success: true, colleges: formattedColleges });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ error: 'College not found' });
    const formattedCollege = {
      id: college._id.toString(),
      name: college.name,
      code: college.code,
      emailDomain: college.emailDomain,
      departments: college.departments,
      createdAt: college.createdAt
    };
    res.json({ success: true, college: formattedCollege });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
