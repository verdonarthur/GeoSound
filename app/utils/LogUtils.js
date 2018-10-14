module.exports = class {
    /**
     * Function used to log the error and send the same message everywhere
     * @param {*} res 
     * @param {*} err 
     */
    static logAndSendError500(res, err) {
        console.log(err)
        res.status(500).send("Sorry, it seems we got a problem here...")
    }
}