const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')


const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    console.log(helper.initialUsers);
    await User.insertMany(helper.initialUsers)
})




afterAll(() => {
    mongoose.connection.close()
})