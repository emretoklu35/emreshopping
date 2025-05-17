const express = require('express');
const campaignRoutes = require('./campaignRoutes');
const sliderRoutes = require('./sliderRoutes');
const electronicsRoutes = require('./electronicsRoutes');
const recommendationsRoutes = require('./recommendationsRoutes');

const router = express.Router();

router.use('/campaigns', campaignRoutes);
router.use('/slider', sliderRoutes);
router.use('/electronics', electronicsRoutes);
router.use('/recommendations', recommendationsRoutes);

module.exports = router; 