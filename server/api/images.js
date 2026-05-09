const express = require('express');
const cors = require('cors');
const dbConnect = require('../utils/dbConnect');
const authMiddleware = require('../utils/authMiddleware');
const Image = require('../models/Image');

const app = express();
app.use(cors());
app.use(express.json());

app.get(['/api/images', '/server/api/images', '*/images'], authMiddleware, async (req, res) => {
  try {
    await dbConnect();
    const images = await Image.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    console.error('Fetch images error:', error);
    res.status(500).json({ message: 'Error fetching images', error: error.message });
  }
});

app.delete(['/api/images/:id', '/server/api/images/:id', '*/images/:id'], authMiddleware, async (req, res) => {
  try {
    await dbConnect();
    const image = await Image.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found or unauthorized' });
    }

    res.status(200).json({ message: 'Image deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});

module.exports = app;
