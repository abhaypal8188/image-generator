const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  style: { type: String, default: 'Realistic' },
  size: { type: String, default: '1024x1024' }
}, { timestamps: true });

module.exports = mongoose.models.Image || mongoose.model('Image', ImageSchema);
