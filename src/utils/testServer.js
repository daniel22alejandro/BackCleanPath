import express from 'express'
import supertest from 'supertest'

function testServer(route) {
    const servidor = express()
    route (servidor)
    return supertest(servidor)
}

module.exports = testServer