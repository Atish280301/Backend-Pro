const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    rating: {type:Number, min:[0,"Wrong min rating"],max:[5,"Wrong max rating"]},
});

exports.Ecom = mongoose.model('Ecom', productSchema);
