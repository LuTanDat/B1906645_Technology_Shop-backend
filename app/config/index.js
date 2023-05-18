const config = {
    app: {
        port: process.env.PORT || 8080,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/TECHNOLOGY_SHOP"
    }
};

module.exports = config;