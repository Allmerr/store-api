const notFound = (req, res) => {
    res.status(404).json({ status: "fail", message: "404 not found" });
};

module.exports = notFound;
