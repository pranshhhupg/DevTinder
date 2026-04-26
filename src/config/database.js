const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://namastenodejs:namastenodejs1210@namastenodejs.0otydp1.mongodb.net/DevTinder"
    )
};

module.exports = connectDB;