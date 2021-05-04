const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const HotelClassifySchema = new mongoose.Schema({
  title: String,

  meta: getMeta(),
});

HotelClassifySchema.pre('save', preSave);

mongoose.model('HotelClassify', HotelClassifySchema);