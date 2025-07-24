const express = require('express');
const { getHotels, getHotelById, createHotel, updateHotel, deleteHotel } = require('../Controllers/hotelController');
const { adminAuth } = require('../Controllers/authController');
const Hotel = require('../models/Hotel');

const router = express.Router();

// Specific routes MUST come before parameterized routes
router.get('/locations', async (req, res) => {
  try {
    const locations = await Hotel.distinct('location');
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

router.get('/filter', async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;
    console.log('Filter request:', req.query);

    const query = {};
    if (location && location.trim() !== '') {
      query.location = new RegExp(location.trim(), 'i');
    }
    if (minPrice && minPrice !== '') {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }
    if (maxPrice && maxPrice !== '') {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    console.log('MongoDB query:', query);
    const hotels = await Hotel.find(query);
    console.log('Filtered hotels found:', hotels.length);
    
    res.json(hotels);
  } catch (error) {
    console.error('Filter error:', error);
    res.status(500).json({ message: 'Failed to filter hotels', error: error.message });
  }
});

// General routes
router.get('/', getHotels);
router.post('/', adminAuth, createHotel);
router.put('/:id', adminAuth, updateHotel);
router.delete('/:id', adminAuth, deleteHotel);

// Parameterized routes MUST come last
router.get('/:id', getHotelById);

module.exports = router;
