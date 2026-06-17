module.exports = {
    port: process.env.PORT || 3000,
    mongodb: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
    jwtSecret: process.env.JWT_SECRET_KEY,
}