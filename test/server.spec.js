// Test för server.js
const supertest = require('supertest')
const mongoose = require('mongoose')
const { app, port, ROUTE, VIEW } = require('../src/server')
const dbUrl = require('../config/config').databasUrl
const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true }

describe('Router tests', () => { // Huvudrubrik till våra test
    let server

    beforeEach((done) => {
        mongoose.connect(dbUrl, dbOptions).then(() => {
            server = app.listen(port, () =>
                console.log('>>>>>>>>>>>> Testing server up'))
            done()
        })
    })

    it('Should respond to /gallery', (done) => {
        supertest(server).get('/gallery').expect(200, done)
    })

    it('Should respond to /product', (done) => {
        supertest(server).get('/product').expect(200, done)
    })

    it('Should respond to post /add-product', (done) => {
        supertest(server).post('/add-product').expect(302, done) // 302 betyder "found, moved temporarily"
    })

    it('Should respond to get /add-product', (done) => {
        supertest(server).get(ROUTE.addProduct).expect(200, done)
    })

    it('Should respond to /', (done) => {
        supertest(server).get('/').expect(200, done)
    })

    afterEach((done) => {
        server.close()
        mongoose.disconnect()
        console.log('                              Server down! <<<<<<<<<<<<<<<<<')
        done()
    })
})