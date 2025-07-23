const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  image: String,
  price: Number,
  capacity: String,
  foodservice: String,
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
    default: 10
  },
  availableRooms: {
    type: Number,
    default: 10
  }
});

module.exports = mongoose.model('Hotel', hotelSchema);
