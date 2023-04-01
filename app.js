require("dotenv").config();
const express = require("express");
const app = express();

const productRoute = require("./routes/product");
const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorResponse");

// route
app.get("/", (req, res) => {
    res.send('<h1>Api Store</h1><a href="/api/products">products routes</a>');
});

app.use("/api/products", productRoute);

// middleware
app.use(errorMiddleware);
app.use(notFoundMiddleware);

// function start
const port = process.env.PORT || 3000;
const connString = process.env.MONGOURI;
const start = async () => {
    try {
        await connectDB(connString);
        app.listen(port, () => {
            console.log(`Listen to port http://localhost:${port}`);
        });
    } catch (err) {
        console.log("something");
        console.log(err);
    }
};

start();
