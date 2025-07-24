const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

exports.createBooking = async (req, res) => {
  try {
    console.log('Creating booking with user:', req.user);
    
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
      userId: req.user._id 
    });
    
    // Decrease available rooms
    await Hotel.findByIdAndUpdate(
      req.body.hotelId,
      { $inc: { availableRooms: -1 } }
    );
    
    res.json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    console.log('Fetching all bookings for admin:', req.user);
    
    const bookings = await Booking.find()
      .populate('hotelId', 'name location price')
      .populate('userId', 'name email')
      .sort({ bookingDate: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    console.log('Cancelling booking:', req.params.id, 'by admin:', req.user);
    
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
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
  }
};
