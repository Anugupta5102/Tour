const router = require('express').Router();
const Hotel = require('../models/Hotel');
const auth = require('../middleware/auth');

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const { location, minPrice, maxPrice, rating } = req.query;
    let query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      query['roomTypes.price'] = {};
      if (minPrice) query['roomTypes.price'].$gte = Number(minPrice);
      if (maxPrice) query['roomTypes.price'].$lte = Number(maxPrice);
    }
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    const hotels = await Hotel.find(query).populate('reviews');
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single hotel
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('reviews');
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create hotel (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newHotel = new Hotel({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      address: req.body.address,
      images: req.body.images,
      amenities: req.body.amenities,
      roomTypes: req.body.roomTypes,
      featured: req.body.featured
    });

    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update hotel (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete hotel (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check room availability
router.post('/:id/check-availability', async (req, res) => {
  try {
    const { startDate, endDate, roomType } = req.body;
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const room = hotel.roomTypes.find(r => r.type === roomType);
    if (!room) {
      return res.status(404).json({ message: 'Room type not found' });
    }

    // Here you would typically check the bookings collection for conflicts
    // This is a simplified version
    res.status(200).json({ available: room.available });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
