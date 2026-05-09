const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dbConnect = require('../utils/dbConnect');
const authMiddleware = require('../utils/authMiddleware');
const User = require('../models/User');
const Image = require('../models/Image');

const app = express();
app.use(cors());
app.use(express.json());

app.post(['/api/generate', '/server/api/generate', '*/generate'], authMiddleware, async (req, res) => {
  try {
    await dbConnect();
    const { prompt, style, size } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.credits <= 0) return res.status(403).json({ message: 'Insufficient credits. Please upgrade or wait for daily refill.' });

    const enhancedPrompt = `${prompt}, in ${style} style`;
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${process.env.GEMINI_API_KEY}`,
      {
        instances: [
          {
            prompt: enhancedPrompt
          }
        ],
        parameters: {
          sampleCount: 1,
          aspectRatio: "1:1",
          outputMimeType: "image/jpeg"
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.predictions || response.data.predictions.length === 0) {
      throw new Error('No image returned from Gemini API');
    }

    const base64Image = response.data.predictions[0].bytesBase64Encoded;
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    const newImage = await Image.create({
      userId: user._id,
      prompt,
      imageUrl,
      style,
      size: size || '1024x1024'
    });

    user.credits -= 1;
    await user.save();

    res.status(200).json({ 
      success: true, 
      image: newImage,
      credits: user.credits
    });
  } catch (error) {
    console.error('Generate error:', error.response?.data || error);
    res.status(500).json({ message: 'Error generating image', error: error.response?.data?.error?.message || error.message });
  }
});

module.exports = app;
