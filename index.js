// Härifrån startar vi upp vår webshop
const mongoose = require('mongoose')
const { app, port } = require('./src/server')
let dbUrl = process.env.MONGO_ATLAS_URL || require('./config/config').databasUrl // the right way!
const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true }

// Kicka igång servern
mongoose.connect(dbUrl, dbOptions).then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
})

module.exports = { app, port, mongoose, dbUrl, dbOptions }