const Complaint = require('../models/Complaint');

const formatComplaint = (c) => ({
  id: c._id.toString(),
  title: c.title,
  description: c.description,
  category: c.category,
  status: c.status,
  priority: c.priority,
  studentId: c.studentId.toString(),
  studentName: c.studentName,
  studentEmail: c.studentEmail,
  collegeId: c.collegeId.toString(),
  assignedDepartment: c.assignedDepartment,
  assignedStaff: c.assignedStaff,
  images: c.images || [],
  adminResponse: c.adminResponse,
  internalNotes: c.internalNotes.map(n => ({
    id: n._id.toString(),
    authorName: n.authorName,
    content: n.content,
    createdAt: n.createdAt
  })),
  createdAt: c.createdAt,
  updatedAt: c.updatedAt,
  resolvedAt: c.resolvedAt
});

exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, images } = req.body;
    
    // Check if student is blocked
    if (req.user.isBlocked) {
      return res.status(403).json({ error: 'Your account has been blocked due to multiple rejected complaints. Please contact admin.' });
    }
    
    const complaint = await Complaint.create({
      title,
      description,
      category,
      images: images || [],
      studentId: req.user._id,
      studentName: req.user.name,
      studentEmail: req.user.email,
      collegeId: req.user.collegeId
    });

    res.status(201).json({ success: true, complaint: formatComplaint(complaint) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'student') {
      query.studentId = req.user._id;
    } else if (req.user.role === 'admin') {
      query.collegeId = req.user.collegeId;
    }

    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    res.json({ success: true, complaints: complaints.map(formatComplaint) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    if (complaint.collegeId.toString() !== req.user.collegeId.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    complaint.status = status;
    if (status === 'resolved') complaint.resolvedAt = Date.now();
    
    // Handle rejection - increment student's rejection count
    if (status === 'rejected') {
      const User = require('../models/User');
      const student = await User.findById(complaint.studentId);
      if (student) {
        student.rejectionCount += 1;
        if (student.rejectionCount >= 5) {
          student.isBlocked = true;
        }
        await student.save();
      }
    }
    
    await complaint.save();

    res.json({ success: true, complaint: formatComplaint(complaint) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComplaintPriority = async (req, res) => {
  try {
    const { priority } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    if (complaint.collegeId.toString() !== req.user.collegeId.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    complaint.priority = priority;
    await complaint.save();

    res.json({ success: true, complaint: formatComplaint(complaint) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignComplaint = async (req, res) => {
  try {
    const { department, staff } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    if (complaint.collegeId.toString() !== req.user.collegeId.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    complaint.assignedDepartment = department;
    complaint.assignedStaff = staff;
    if (complaint.status === 'pending') complaint.status = 'in-progress';
    await complaint.save();

    res.json({ success: true, complaint: formatComplaint(complaint) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addNote = async (req, res) => {
  try {
    const { content } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    if (complaint.collegeId.toString() !== req.user.collegeId.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    complaint.internalNotes.push({ authorName: req.user.name, content });
    await complaint.save();

    res.json({ success: true, complaint: formatComplaint(complaint) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addResponse = async (req, res) => {
  try {
    const { response } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    if (complaint.collegeId.toString() !== req.user.collegeId.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    complaint.adminResponse = response;
    complaint.status = 'in-progress';
    await complaint.save();

    res.json({ success: true, complaint: formatComplaint(complaint) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { title, description, category, images } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    if (complaint.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    if (complaint.status !== 'pending') {
      return res.status(400).json({ error: 'Can only edit pending complaints' });
    }

    complaint.title = title;
    complaint.description = description;
    complaint.category = category;
    complaint.images = images || [];
    await complaint.save();

    res.json({ success: true, complaint: formatComplaint(complaint) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
