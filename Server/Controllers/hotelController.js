// const Hotel = require('../models/Hotel');

// exports.getHotels = async (req, res) => {
//   try {
//     const hotels = await Hotel.find();
//     res.json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch hotels', error: error.message });
//   }
// };

// exports.getHotelById = async (req, res) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) {
//       return res.status(404).json({ message: 'Hotel not found' });
//     }
//     res.json(hotel);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch hotel', error: error.message });
//   }
// };

// exports.createHotel = async (req, res) => {
//   try {
//     console.log('Creating hotel with user:', req.user);
//     console.log('Request body:', req.body);
    
//     const { name, location, description, image, price, capacity, foodservice, totalRooms, availableRooms } = req.body;
    
//     // Validate required fields
//     if (!name || !location || !description || !image || !price || !capacity || !foodservice || !totalRooms || !availableRooms) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
    
//     // Create hotel
//     const hotelData = {
//       name: name.trim(),
//       location: location.trim(),
//       description: description.trim(),
//       image: image.trim(),
//       price: Number(price),
//       capacity: capacity.trim(),
//       foodservice: foodservice.trim(),
//       totalRooms: Number(totalRooms),
//       availableRooms: Number(availableRooms),
//       rating: 0,
//       totalReviews: 0
//     };
    
//     const hotel = await Hotel.create(hotelData);
//     console.log('Hotel created successfully:', hotel);
    
//     res.status(201).json(hotel);
//   } catch (error) {
//     console.error('Create hotel error:', error);
//     res.status(500).json({ message: 'Failed to create hotel', error: error.message });
//   }
// };

// exports.updateHotel = async (req, res) => {
//   try {
//     const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!hotel) {
//       return res.status(404).json({ message: 'Hotel not found' });
//     }
//     res.json(hotel);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update hotel', error: error.message });
//   }
// };

// exports.deleteHotel = async (req, res) => {
//   try {
//     const hotel = await Hotel.findByIdAndDelete(req.params.id);
//     if (!hotel) {
//       return res.status(404).json({ message: 'Hotel not found' });
//     }
//     res.json({ message: 'Hotel deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete hotel', error: error.message });
//   }
// };



const Hotel = require('../models/Hotel');

// GET all hotels (with optional query filters)
exports.getHotels = async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;

    const query = {};
    if (location) query.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);

    const hotels = await Hotel.find(query);
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Failed to fetch hotels', error: error.message });
  }
};

// GET hotel by ID
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

// CREATE a new hotel
exports.createHotel = async (req, res) => {
  try {
    console.log('Creating hotel with user:', req.user);
    console.log('Request body:', req.body);

    const {
      name,
      location,
      description,
      image,
      price,
      capacity,
      foodservice,
      totalRooms,
      availableRooms
    } = req.body;

    // Validate required fields (avoid rejecting 0 values)
    const requiredFields = [name, location, description, image, price, capacity, foodservice, totalRooms, availableRooms];
    const hasEmpty = requiredFields.some(field => field === undefined || field === null || field === '');

    if (hasEmpty) {
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

// UPDATE a hotel
exports.updateHotel = async (req, res) => {
  try {
    const updatableFields = [
      'name',
      'location',
      'description',
      'image',
      'price',
      'capacity',
      'foodservice',
      'totalRooms',
      'availableRooms'
    ];

    const updates = {};
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = typeof req.body[field] === 'string' ? req.body[field].trim() : req.body[field];
      }
    });

    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.totalRooms !== undefined) updates.totalRooms = Number(updates.totalRooms);
    if (updates.availableRooms !== undefined) updates.availableRooms = Number(updates.availableRooms);

    const hotel = await Hotel.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.json(hotel);
  } catch (error) {
    console.error('Update hotel error:', error);
    res.status(500).json({ message: 'Failed to update hotel', error: error.message });
  }
};

// DELETE a hotel
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Delete hotel error:', error);
    res.status(500).json({ message: 'Failed to delete hotel', error: error.message });
  }
};
