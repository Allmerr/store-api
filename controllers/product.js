const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const getAllResponse = await Product.find({});
    res.send({ nbHits: getAllResponse.length, status: "success", message: "Get All Products", data: getAllResponse });
};

const getAllProducts = async (req, res) => {
    // === get all query needed
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name };
    }

    if (numericFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        };

        const regEx = /\b(<|>|>=|=|<|<=)\b/g;

        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

        const options = ["price", "rating"];

        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    // ===  chain for sort
    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("createdAt");
    }

    // === chain for fields
    if (fields) {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }

    // === chain for pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // * page = 2
    // * limit = 10
    // * skip = (page - 1) * limit = 10

    result = result.skip(skip).limit(limit);

    const getAllResponse = await result;

    res.send({ nbHits: getAllResponse.length, status: "success", message: "Get All Products", data: getAllResponse });
};

module.exports = { getAllProducts, getAllProductsStatic };
