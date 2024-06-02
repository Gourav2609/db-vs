const express = require('express');
const Data = require('../models/dataModel');

const router = express.Router();

// GET /api/data
router.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    console.log('Data retrieved:', data);  // Add this line to log the data
    res.json(data);
  } catch (err) {
    console.error('Error retrieving data:', err);  // Add this line to log errors
    res.status(500).send(err);
  }
});

module.exports = router;
