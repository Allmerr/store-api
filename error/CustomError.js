class CustomError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.sts = statusCode;
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomError(msg, statusCode);
};

module.exports = { createCustomError, CustomError };
