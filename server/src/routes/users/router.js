const { Router } = require('express')
const {showAll, showById, create, updateById, destroyById, loginUser} = require('./controller')
const { authenticate } = require('../../middleware/auth')

const router = new Router()

//GET /users - Get a list of all users.
router.get('/', authenticate, showAll)

//GET /users/:id - Get the details of a specific user.
router.get('/:id', authenticate, showById)

//POST /users/register - Add a new user.
router.post('/register', create)

//POST /users/login - login for user
router.post('/login', loginUser)

//PUT /users/:id - Update an existing user.
router.put('/:id', updateById)

//DELETE /users/:id - Delete an existing user.
router.delete('/id', destroyById)

module.exports = router