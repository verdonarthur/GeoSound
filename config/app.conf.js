module.exports = {
    urlDatabase: process.env.MONGODB_URI || 'mongodb://localhost/my-database-name',
    secretKey: process.env.SECRET_KEY || 'changeme'
    // other configuration...

}

