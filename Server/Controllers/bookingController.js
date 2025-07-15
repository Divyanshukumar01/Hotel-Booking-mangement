const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

exports.createBooking = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const booking = await Booking.create({ ...req.body, userId: decoded.id });
  res.json(booking);
};