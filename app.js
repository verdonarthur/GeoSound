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

app.use('/api/user', userRouter)

app.get('/', (req,res)=>{
    res.send('application is launched')
});

app.listen(port, 
    () => console.log(`App listening on port : ${port}!`))
