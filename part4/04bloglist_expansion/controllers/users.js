const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//Saves a new user that adheres to the parameters, else returns status 400
//and an error
usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try{
    const savedUser = await user.save()
    response.json(savedUser)
    } catch (err) {
    response
    .status(400)
    .json({ "error": "Username and Password missing or shorter than 3 characters" })
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter