const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/app.conf.js')
const app = express()
const port = process.env.port || 3000

/*+++++++++++++++EXPRESS CONFIGURATION++++++++++++++++++*/
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

/*+++++++++++++++MONGOOSE CONFIGURATION++++++++++++++++++*/
mongoose.connect(config.urlDatabase);

/*+++++++++++++++API ROUTE LOADING++++++++++++++++++*/
// example : app.use('/api/user', user)

app.get('/', (req,res)=>{
    res.send('application is launched')
});

app.listen(port, 
    () => console.log(`App listening on port : ${port}!`))
