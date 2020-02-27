// Test för server.js
const supertest = require('supertest')
const mongoose = require('mongoose')
const { app, port } = require('../src/server')
const dbUrl = require('../config/config').databasUrl
const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true }

describe('Router tests', () => { // Huvudrubrik till våra test
    let server

    beforeEach(async () => {
        await mongoose.connect(dbUrl, dbOptions).then(() => {
            server = app.listen(port, () =>
                console.log('                  >>>>>>>>>>>> Testing server up'))
        })
    })

    it('Should respond to /gallery', () => {       // Ett test för att se om servern svarar på get /
        supertest(server).get('/gallery').expect(200);   // vi testar om vi får svar på /
    })

    it('Should respond to /product', () => {
        supertest(server).get('/product').expect(200)
    })

    it('Should respond to post /add-product', () => {
        supertest(server).post('/add-product').expect(302)
    })

    it('Should respond to /', () => {
        supertest(server).get('/').expect(200)
    })

    afterEach(() => {                       // afterEach körs efter varje 'it' test
        server.close()
        mongoose.disconnect()
        console.log('                  Server down! <<<<<<<<<<<<<<<<<')
    })
})