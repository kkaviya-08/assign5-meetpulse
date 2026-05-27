const logger = (req, res, next) => {

    console.log(`${req.method} Request Received`);

    next();
};

module.exports = logger;