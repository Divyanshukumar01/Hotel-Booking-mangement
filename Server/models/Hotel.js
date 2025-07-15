const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  image: String,
  price: Number,
});

module.exports = mongoose.model('Hotel', hotelSchema);