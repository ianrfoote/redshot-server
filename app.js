const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const User = require('./models/user');

const userRouter = require('./user');

const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://redshot:redshot@redshot.1hv3c0t.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.log('Error connecting to MongoDB Atlas', err);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
