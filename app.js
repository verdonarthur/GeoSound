const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/app.conf.js')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./routes/userRouter')

/*+++++++++++++++EXPRESS CONFIGURATION++++++++++++++++++*/
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

/*+++++++++++++++MONGOOSE CONFIGURATION++++++++++++++++++*/
mongoose.connect(config.urlDatabase);

/*+++++++++++++++API ROUTE LOADING++++++++++++++++++*/
// example : app.use('/api/user', user)
app.use('/api/sound', require('./routes/soundRouter'))

app.use('/api/user', userRouter)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*+++++++++++++++API MIDDLEWARE TO MANAGE ERROR++++++++++++++++++*/
// API error handler (responds with JSON)
app.use('/api', (err, req, res, next) => {

    // Log the error on stderr
    console.warn(err);

    // Respond with 422 Unprocessable Entity if it's a Mongoose validation error
    if (err.name == 'ValidationError' && !err.status) {
        err.status = 422;
    }

    // Set the response status code
    res.status(err.status || 500);

    // Send the error message in the response
    const response = {
        message: err.message
    };

    // If it's a validation error, also send the errors details from Mongoose
    if (err.status == 422) {
        response.errors = err.errors;
    }

    // Send the error response
    res.send(response);
});

// Generic error handler (responds with HTML)
app.use((err, req, res, next) => {

    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});


/*+++++++++++++++MAIN ROUTE++++++++++++++++++*/
app.get('/', (req, res) => {
    res.send('application is launched')
});

app.listen(port,
    () => console.log(`App listening on port : ${port}!`))
