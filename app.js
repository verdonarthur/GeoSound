const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/app.conf.js')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const soundRouter = require('./routes/soundRouter')
const authenticate = require('./app/utils/authenticate')

/*+++++++++++++++EXPRESS CONFIGURATION++++++++++++++++++*/
app.use(express.json())       // to support JSON-encoded bodies
app.use(express.urlencoded()) // to support URL-encoded bodies

/*+++++++++++++++MONGOOSE CONFIGURATION++++++++++++++++++*/
mongoose.connect(config.urlDatabase)

/*+++++++++++++++API ROUTE LOADING++++++++++++++++++*/
// example : app.use('/api/user', user)

app.use('/', authRouter)

app.use('/api/sound', authenticate, soundRouter)
app.use('/api/user', authenticate, userRouter)

app.get('/', (req, res) => {
    res.send('application is running')
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

/*+++++++++++++++API MIDDLEWARE TO MANAGE ERROR++++++++++++++++++*/
// API error handler (responds with JSON) (and error from register function)

app.use('/api|register', (err, req, res, next) => {
    // Log the error on stderr
    console.warn(err)

    // Respond with 422 Unprocessable Entity if it's a Mongoose validation error
    if (err.name == 'ValidationError' && !err.status) {
        err.status = 422
    }

    // Respond with 409 for errors coming from Mongo where a unique key already exists (such as a username already existing when trying to register)
    if (err.code == 11000 && err.name == 'MongoError' && !err.status) {
        err.status = 409;
    }

    // Respond with 400 Bad Request when Mongoose can't cast a client given parameter
    if (err.name == 'CastError' && !err.status) {
        err.status = 400;
    }

    // Set the response status code
    res.status(err.status || 500)

    // Send the error message in the response
    const response = {
        message: err.message
    }

    // If it's a validation error, also send the errors details from Mongoose
    if (err.status == 422) {
        response.errors = err.errors
    }

    // Send the error response
    res.send(response)
})

// Generic error handler (responds with HTML)
app.use((err, req, res, next) => {

    // Set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // Render the error json
    res.status(err.status || 500);
    res.send(err);
});

app.listen(port,
    () => console.log(`App listening on port : ${port}!`))

