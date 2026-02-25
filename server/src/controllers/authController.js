const jwt = require('jsonwebtoken');
const User = require('../models/User');
const College = require('../models/College');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerCollege = async (req, res) => {
  try {
    const { name, code, emailDomain, departments, adminName, adminEmail, adminPassword } = req.body;

    // Validate required fields
    if (!name || !code || !emailDomain || !adminName || !adminEmail || !adminPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingCollege = await College.findOne({ code: code.toUpperCase() });
    if (existingCollege) return res.status(400).json({ error: 'College code already exists' });

    const existingUser = await User.findOne({ email: adminEmail.toLowerCase() });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    const college = await College.create({ name, code: code.toUpperCase(), emailDomain: emailDomain.toLowerCase(), departments: departments && departments.length > 0 ? departments : ['General'] });

    const admin = await User.create({
      role: 'admin',
      name: adminName,
      email: adminEmail.toLowerCase(),
      password: adminPassword,
      collegeId: college._id,
      collegeCode: college.code,
      collegeName: college.name
    });

    res.status(201).json({ success: true, token: generateToken(admin._id), user: { id: admin._id, role: admin.role, name: admin.name, email: admin.email, collegeId: admin.collegeId, collegeName: admin.collegeName, collegeCode: admin.collegeCode } });
  } catch (error) {
    console.error('Register college error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, collegeId, enrollmentNumber } = req.body;

    // Validate required fields
    if (!name || !email || !password || !collegeId || !enrollmentNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    const college = await College.findById(collegeId);
    if (!college) return res.status(404).json({ error: 'College not found' });

    const emailDomain = email.split('@')[1]?.toLowerCase();
    if (emailDomain !== college.emailDomain) {
      return res.status(400).json({ error: `Use your official college email (@${college.emailDomain})` });
    }

    const student = await User.create({
      role: 'student',
      name,
      email: email.toLowerCase(),
      password,
      collegeId: college._id,
      collegeCode: college.code,
      enrollmentNumber,
      rejectionCount: 0,
      isBlocked: false
    });

    res.status(201).json({ success: true, token: generateToken(student._id), user: { id: student._id, role: student.role, name: student.name, email: student.email, collegeId: student.collegeId, collegeCode: student.collegeCode, enrollmentNumber: student.enrollmentNumber, rejectionCount: student.rejectionCount, isBlocked: student.isBlocked } });
  } catch (error) {
    console.error('Register student error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const userData = { id: user._id, role: user.role, name: user.name, email: user.email, collegeId: user.collegeId, collegeCode: user.collegeCode };
    if (user.role === 'admin') userData.collegeName = user.collegeName;
    if (user.role === 'student') {
      userData.enrollmentNumber = user.enrollmentNumber;
      userData.rejectionCount = user.rejectionCount || 0;
      userData.isBlocked = user.isBlocked || false;
    }

    res.json({ success: true, token: generateToken(user._id), user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};
