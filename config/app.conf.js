module.exports = {
    urlDatabase: process.env.MONGODB_URI || 'mongodb://localhost:27017/geosound',
    secretKey: process.env.SECRET_KEY || 'changeme'
    // other configuration...

}

