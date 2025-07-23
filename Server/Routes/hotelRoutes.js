const express = require('express');
const { getHotels, getHotelById } = require('../Controllers/hotelController');
const Hotel = require('../models/Hotel');

const router = express.Router();

// GET /hotels - all hotels
router.get('/', getHotels);

// GET /hotels/locations - all unique hotel locations (must be before /:id)
router.get('/locations', async (req, res) => {
  try {
    const locations = await Hotel.distinct('location');
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// GET /hotels/filter - filter hotels (must be before /:id)
router.get('/filter', async (req, res) => {
  try {
    console.log('Filter request received with params:', req.query);
    
    const { location, minPrice, maxPrice } = req.query;
    const query = {};

    if (location && location.trim() !== '') {
      query.location = { $regex: new RegExp(location.trim(), 'i') };
    }

    if ((minPrice && minPrice !== '') || (maxPrice && maxPrice !== '')) {
      query.price = {};
      if (minPrice && minPrice !== '') query.price.$gte = parseFloat(minPrice);
      if (maxPrice && maxPrice !== '') query.price.$lte = parseFloat(maxPrice);
    }

    console.log('MongoDB query:', query);
    const hotels = await Hotel.find(query);
    console.log('Found hotels:', hotels.length);

    // Return empty array instead of 404 for no results
    res.json(hotels);
  } catch (error) {
    console.error('Error filtering hotels:', error);
    res.status(500).json({ error: 'Server error while filtering hotels.' });
  }
});

// GET /hotels/:id - specific hotel (must be last)
router.get('/:id', getHotelById);

module.exports = router;
