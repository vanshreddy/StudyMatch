// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');


const prisma = new PrismaClient();


const createUser = catchAsync(async (req, res) => {
    // Validation rules
  body('email', 'Invalid email').isEmail().normalizeEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
  body('name', 'Name is required').notEmpty().trim().escape(),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {
      // Check if email already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
});


const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Create token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

});


module.exports = {
    createUser,
  };