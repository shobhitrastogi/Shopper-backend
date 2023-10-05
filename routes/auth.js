const express = require("express");
const router = express.Router();
const User = require("../models/User");
var bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser");
 const JWT_SECRET='shyamjiisagoodboy'

 router.post(
    '/register',
    [
      body('username'),
      body('password'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

     // Hash the password before storing it in the database
     const hashedPassword = await bcrypt.hash(password, 10);

     const user = new User({ username, password: hashedPassword });
     await user.save();
 
     res.json({ message: 'User registered successfully' });
   }
 );


 router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  // Compare the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Create and send the JWT token as the login is successful
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});



module.exports = router;


// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWFkMWM1ZjU5ZTI2MjZlYTAzMmIxMiIsImlhdCI6MTY5NjI1NjUzOH0.SvETYoSHIsmMwESYdB8UjJ57tjLA2tG0L4ropd9wDWE"
// }