const { Router } = require('express')

const users = require('./users/router')


const allRoutes = new Router()

allRoutes.use('/users', users)



module.exports = allRoutes