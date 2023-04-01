const mongoose = require("mongoose");

const connectDB = (url) => {
    mongoose
        .connect(url)
        .then(() => console.log("connect database success"))
        .catch((err) => console.log(err));
};

module.exports = connectDB;
