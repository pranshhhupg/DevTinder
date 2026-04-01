const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://namastenodejs:WJmjh205ngCMUyar@namastenodejs.0otydp1.mongodb.net/DevTinder"
    )
};

module.exports = connectDB;