const router = require('express').Router();
const Tour = require('../models/Tour');
const auth = require('../middleware/auth');

// Get all tours
router.get('/', async (req, res) => {
  try {
    console.log("hello hello hello........")
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single tour
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create tour (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newTour = new Tour({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      duration: req.body.duration,
      location: req.body.location,
      maxGroupSize: req.body.maxGroupSize,
      images: req.body.images,
      featured: req.body.featured
    });

    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update tour (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete tour (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
