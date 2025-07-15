const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String
});

module.exports = mongoose.model('Booking', bookingSchema);