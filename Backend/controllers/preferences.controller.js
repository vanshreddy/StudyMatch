// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');


const prisma = new PrismaClient();



const updatePreferences = catchAsync(async (req, res) => {
    const { userId, preferences } = req.body;

    try {
      const updatedUser = await prisma.user.update({ //update user preference
        where: {
          id: userId,
        },
        data: {
          preferences: {
            create: preferences,
          },
        },
        include: {
          preferences: true,
        },
      });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Unable to add preferences' });
    }
});