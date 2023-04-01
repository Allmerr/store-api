const { CustomError } = require("../error/CustomError");

const err = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomError) {
        return res.status(err.sts).json({
            status: "fail",
            message: err.message,
            error: err,
        });
    }
    return res.status(500).json({
        status: "fail",
        message: "Something went wrong",
        error: err,
    });
};

module.exports = err;
