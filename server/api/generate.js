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
      `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0`,
      { inputs: enhancedPrompt },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer' // Hugging Face returns binary image data
      }
    );

    if (!response.data) {
      throw new Error('No image returned from API');
    }

    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
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
