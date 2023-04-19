const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models/user');

router.post('/register', async (req, res) => {
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
  
module.exports = router;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const userRouter = require('./user');
app.use('/user', userRouter);

// Route for uploading player photos
app.post('/api/photos', (req, res) => {
  // TODO: Implement photo upload logic
});

// Route for checking for headshots
app.post('/api/headshots', (req, res) => {
  // TODO: Implement headshot detection logic
});

// Route for retrieving game results
app.get('/api/results', (req, res) => {
  // TODO: Implement game result retrieval logic
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
