const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  capacity: {
    type: String,
    required: [true, 'Capacity is required'],
    trim: true
  },
  foodservice: {
    type: String,
    required: [true, 'Food service is required'],
    trim: true
  },
  rating: { 
    type: Number, 
    default: 0, 
    min: 0, 
    max: 5 
  },
  totalReviews: { 
    type: Number, 
    default: 0 
  },
  totalRooms: {
    type: Number,
    required: [true, 'Total rooms is required'],
    min: [1, 'Total rooms must be at least 1']
  },
  availableRooms: {
    type: Number,
    required: [true, 'Available rooms is required'],
    min: [0, 'Available rooms cannot be negative']
  }
}, {
  timestamps: true
});

// Validation to ensure availableRooms <= totalRooms
hotelSchema.pre('save', function(next) {
  if (this.availableRooms > this.totalRooms) {
    next(new Error('Available rooms cannot exceed total rooms'));
  }
  next();
});

module.exports = mongoose.model('Hotel', hotelSchema);
