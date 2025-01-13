const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = "your_jwt_secret";

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'User registration failed', details: err.message });
  }
};

const login = async (req, res) => {
  //const { username, password } = req.body;
  //const user = await User.findOne({ username });
  const { username, password, mobilenum, email, role } = req.body;
  const user = new User({ username, password: hashedPassword, mobilenum, email, role });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { register, login };
