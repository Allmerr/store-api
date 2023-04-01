require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const dataProduct = require("./products.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGOURI);
        await Product.deleteMany();
        await Product.insertMany(dataProduct);
        console.log("success");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
