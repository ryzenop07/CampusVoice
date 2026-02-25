require('dotenv').config();
const mongoose = require('mongoose');
const College = require('./src/models/College');
const User = require('./src/models/User');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if demo college already exists
    const existingCollege = await College.findOne({ code: 'NIT2024' });
    if (existingCollege) {
      console.log('Demo college already exists');
      process.exit(0);
    }

    // Create demo college
    const demoCollege = await College.create({
      name: 'National Institute of Technology',
      code: 'NIT2024',
      emailDomain: 'nit.edu',
      departments: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Administration']
    });

    console.log('Demo college created successfully');
    console.log('College Code:', demoCollege.code);
    console.log('Email Domain:', demoCollege.emailDomain);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
