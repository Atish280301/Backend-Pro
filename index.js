require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const productRouter = require('./routes/product');
const server = express();
const path = require('path');

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}
main();

// Middleware
server.use(cors());
server.use(express.json());
server.use(morgan('combined'));
// server.use(express.static('public'));
server.use(express.static(path.resolve(__dirname, 'dist')));
// Routes
server.use('/products', productRouter.routes);
server.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start server
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});