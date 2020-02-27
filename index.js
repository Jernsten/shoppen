// Härifrån startar vi upp vår webshop
const mongoose = require('mongoose')
const { app, port } = require('./src/server')
const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true }
let dbUrl = process.env.MONGO_ATLAS_URL

if (dbUrl == undefined) {
    try {
        dbUrl = require('./config/config').databasUrl // the right way!
    } catch (exception) {
        console.log("could not load local config file", exception.message)
    }
}

// Kicka igång servern
mongoose.connect(dbUrl, dbOptions).then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
})

module.exports = { app, port, mongoose, dbUrl, dbOptions }