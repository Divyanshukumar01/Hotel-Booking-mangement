const Hotel = require('../models/Hotel');

exports.getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
};

exports.getHotelById = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
};

