const express = require('express');
const { createBooking, getAllBookings, cancelBooking } = require('../Controllers/bookingController');
const { adminAuth } = require('../Controllers/authController');
const router = express.Router();

router.post('/', createBooking);
router.get('/admin', adminAuth, getAllBookings);
router.put('/cancel/:id', adminAuth, cancelBooking);

module.exports = router;
