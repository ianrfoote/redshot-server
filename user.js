const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('./models/user');
const router = express.Router();

// User registration route
router.post('/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
  
    // Check if the user already exists
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
  
    // Save the new user to the database
    await newUser.save();
  
    res.status(201).json({ message: 'User created successfully' });
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare the passwords
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Create a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.status(200).json({ token });
});

module.exports = router;
