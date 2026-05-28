const User = require('../models/User.model');

// @desc    Get all users
// @route   GET /api/users
// @access  Admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.status(200).json({ users, total: users.length });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// @desc    Get single user by userId
// @route   GET /api/users/:userId
// @access  Admin only
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Admin only
const createUser = async (req, res) => {
  try {
    const { userId, name, email, password, role, department, phone } = req.body;

    if (!userId || !name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const existingUser = await User.findOne({ $or: [{ userId }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'User ID or Email already exists' });
    }

    const user = await User.create({
      userId,
      name,
      email,
      password,
      role,
      department: department || 'General',
      phone: phone || '',
    });

    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// @desc    Update user
// @route   PUT /api/users/:userId
// @access  Admin only
const updateUser = async (req, res) => {
  try {
    const { name, email, role, department, phone, isActive } = req.body;

    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;
    if (department !== undefined) user.department = department;
    if (phone !== undefined) user.phone = phone;
    if (isActive !== undefined) user.isActive = isActive;

    // If password is being updated
    if (req.body.password) {
      user.password = req.body.password; // pre-save hook will hash it
    }

    await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:userId
// @access  Admin only
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prevent admin from deleting themselves
    if (user.userId === req.user.userId) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.deleteOne({ userId: req.params.userId });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };