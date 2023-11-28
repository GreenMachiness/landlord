require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { findAll, findById, insert, modifyById, findByUsername, findAllAdmin } = require('./service')


//show all users in the Database 
exports.showAll = async (req, res) => {
  try {
    
    //get the authenticated user object from the middleware
    const {
      user
    } = req

    // Define the roles allowed to access
    if (!user || (user.permission !== 'owner' && user.permission !== 'admin')) { // Only allow admins to access the user list
      return res.status(403).json({ error: 'You do not have permission to access this resource' })
    }

    // If the user is an admin, get the list of all users
    const users = await findAll()
    
    return res.json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
}

//get specific user using ID from the database 
exports.showById = async (req, res) => {
  try {

    //get the authenticated user object from the middleware
    const {
      user,
      params
    } = req

    // Only allow admins and account owners to access the user data
      // reject if the user object does not exist or,
      // if the user is not the same as the requested id and the user is not an admin
    if (!user || (user.id != params.id && user.role !== 'admin')) {
      return res.status(403).json({ error: 'You do not have permission to access this resource' })
    }

    // If the user is an admin or the account owner get the data from the database
    const result = await findById(params.id)
    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json('Internal Server Error')
  }
}

//create a new user, add to database
exports.create = async (req, res) => {
  try {
    const userData = req.body    
    const user = await insert(userData)
    return res.json(user)

  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
}

//login user that matches the username + password from the database
exports.loginUser = async (req, res) => {
  try {
    // get credentials from header
    // A valid Auth header for username + password should look like:
      // "Basic dXNlcm5hbWU6cGFzc3dvcmQ="
    const authHeader = req.headers.authorization
    // check if auth header is missing 
    // or if auth header does not Basic type (username + password)
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Invalid authorization header' })
    }
    // remove "Basic" from the start of the header
    // decode the base64 string to text
      // "dXNlcm5hbWU6cGFzc3dvcmQ=" turns into "username:password"
    // split the string into an array at the ":"
    const credentials = Buffer.from(authHeader.slice(6), 'base64').toString().split(':')

    // destructure credentials array
    const [username, password] = credentials 

    // get the user with the provided username
    const user = await findByUsername(username)

    // bcrypt.compare takes the plain-text password and re-hashes 
      // then compares to the hash in the database
    if (!user || !await bcrypt.compare(password, user.password)) {
      // If the user isn't found or the password is incorrect, return an error
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    // Create a JWT, with the payload {id: user.id}, 
      // and sign the token with the SECRET_KEY from .env
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY)
    // send the token back to the client
    return res.status(200).json({ token })

  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
}

exports.getUsers = async (req, res) => {
  try {
    
    //get the authenticated user object from the middleware
    const {
      user
    } = req

    // Define the roles allowed to access
    if (!user || user.role !== 'admin') { // Only allow admins to access the user list
      return res.status(403).json({ error: 'You do not have permission to access this resource' })
    }

    // If the user is an admin, get the list of all users
    const users = await findAllAdmin()
    
    return res.json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
}

//update parameters with specific ID from database
exports.updateById = async (req, res) => {

  try {
    
    // get the id from the request
    const {id} = req.params
    console.log(id)

    // get user using id from the database
    const user = await findById(id)
    console.log(user)

    // get the data to update the user from the request
    const body = req.body
    console.log(body)

    // merge the updates
    const dataToUpdate = Object.assign(user, body)
    console.log(dataToUpdate)
    // update the user in the database and return the updated User
    const updatedUser = await modifyById(id, dataToUpdate)
    console.log(updatedUser)
    // return response with the updated user
    return res.json(updatedUser)

  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Internal Server Error'})
  }
}

//Delete user with specific id from the database
exports.destroyById = async (req, res) => {

  try {
    
    // get the id from the request
    const {id} = req.params
    console.log(id)

    // delete the user from the database with the id
    const deletedUserId = await deleteById(id)
    // return response saying user with id is deleted
    return res.json({message: `user with id: ${deletedUserId} deleted`})

  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Internal Server Error'})
  }
}
