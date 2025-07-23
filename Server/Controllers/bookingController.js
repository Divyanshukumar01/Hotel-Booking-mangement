const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const jwt = require('jsonwebtoken');

exports.createBooking = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check hotel availability
    const hotel = await Hotel.findById(req.body.hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    if (hotel.availableRooms <= 0) {
      return res.status(400).json({ message: 'No rooms available' });
    }
    
    // Create booking
    const booking = await Booking.create({ 
      ...req.body, 
      userId: decoded.id 
    });
    
    // Decrease available rooms
    await Hotel.findByIdAndUpdate(
      req.body.hotelId,
      { $inc: { availableRooms: -1 } }
    );
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('hotelId', 'name location price')
      .populate('userId', 'email')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Update booking status
    booking.status = 'cancelled';
    await booking.save();
    
    // Increase available rooms
    await Hotel.findByIdAndUpdate(
      booking.hotelId,
      { $inc: { availableRooms: 1 } }
    );
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
  }
};
