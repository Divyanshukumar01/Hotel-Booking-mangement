const express = require('express');
const { createBooking, getAllBookings, cancelBooking } = require('../Controllers/bookingController');
const router = express.Router();

router.post('/', createBooking);
router.get('/admin', getAllBookings);
router.put('/cancel/:id', cancelBooking);

module.exports = router;
