const Hotel = require('../models/Hotel');

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Failed to fetch hotels', error: error.message });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Error fetching hotel by ID:', error);
    res.status(500).json({ message: 'Failed to fetch hotel', error: error.message });
  }
};

exports.createHotel = async (req, res) => {
  try {
    console.log('Creating hotel with user:', req.user);
    console.log('Request body:', req.body);

    const { name, location, description, image, price, capacity, foodservice, totalRooms, availableRooms } = req.body;

    if (!name || !location || !description || !image || !price || !capacity || !foodservice || !totalRooms || !availableRooms) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hotelData = {
      name: name.trim(),
      location: location.trim(),
      description: description.trim(),
      image: image.trim(),
      price: Number(price),
      capacity: capacity.trim(),
      foodservice: foodservice.trim(),
      totalRooms: Number(totalRooms),
      availableRooms: Number(availableRooms),
      rating: 0,
      totalReviews: 0
    };

    const hotel = await Hotel.create(hotelData);
    console.log('Hotel created successfully:', hotel);

    res.status(201).json(hotel);
  } catch (error) {
    console.error('Create hotel error:', error);
    res.status(500).json({ message: 'Failed to create hotel', error: error.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update hotel', error: error.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete hotel', error: error.message });
  }
};
