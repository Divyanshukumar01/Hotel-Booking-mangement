const express = require('express');
const { createBooking } = require('../Controllers/bookingController');
const router = express.Router();

router.post('/', createBooking);

module.exports = router;
