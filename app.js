const express = require('express')
const app = express()
const port = 3000

/*+++++++++++++++EXPRESS CONFIGURATION++++++++++++++++++*/
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(express.static('./public'))

/*+++++++++++++++API ROUTE LOADING++++++++++++++++++*/
// example : app.use('/api/user', user)

app.listen(port, 
    () => console.log(`App listening on port : ${port}!`))
