require('dotenv').config()
const jwt = require('jsonwebtoken')
const { findById } = require('../routes/users/service')

exports.authenticate = async (req, res, next) => {
    // Check if the correct Auth Header is provided
    const authHeader = req.headers.authorization
    // A valid Auth header for JWT should look like:
      // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwMDY5MDQyfQ.4IigdSKMJAAYGPQi_mhZEFsyRqSoF1oiJH5qe5GwMLQ"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid authentication header' })
    }
  
    // Get the JWT from the request headers
      // split the header at the space and get the second element
      // This removes "Bearer" from the front
    const token = authHeader.split(' ')[1]  
  
    // If there's no token, return an error
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }
  
    try {
      // decode and verify the JWT using the SECRET_KEY that originally signed the token
        // if the token is not valid it will error and go to catch block
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
  
      //get the user data from the database using the user id provided by the JWT
        // findById is from '../routes/users/service'
      const user = await findById(decoded.id)
  
      // Add the user object to the request object
      req.user = user
  
      next()
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }
  }