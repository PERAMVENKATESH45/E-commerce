const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/VerifyToken');
const adminController = require('../controllers/Admin'); // Create this file next

// Example: Admin dashboard route
router.get('/dashboard', verifyToken, isAdmin, adminController.dashboard);

// Add more admin routes as needed

module.exports = router;
