const express = require('express');
const { getHotels, getHotelById, createHotel, updateHotel, deleteHotel } = require('../Controllers/hotelController');
const { adminAuth } = require('../Controllers/authController');
const Hotel = require('../models/Hotel');

const router = express.Router();

router.get('/locations', async (req, res) => {
  try {
    const locations = await Hotel.distinct('location');
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

router.get('/', getHotels);
router.post('/', adminAuth, createHotel);
router.put('/:id', adminAuth, updateHotel);
router.delete('/:id', adminAuth, deleteHotel);
router.get('/:id', getHotelById);

module.exports = router;
