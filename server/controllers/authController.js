import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Basic mock implementation (password should be hashed in production using bcrypt)
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ name, email, password });
    await newUser.save();
    
    // Simulate JWT token
    res.status(201).json({ message: 'User registered successfully', token: 'mock-jwt-token-register' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // Mock authentication
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'User logged in', token: 'mock-jwt-token-login', user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
