const knex = require('../../knex.js')
const bcrypt = require('bcrypt')

//find all users from db
exports.findAll = async () => {
  const users = await knex('users').select('*')
  return users
}

//find user by id from db
exports.findById = async (id) => {
  const user = await knex('users').where('id', id).first()
  return user
}

exports.findAllAdmin = async () => {
  const users = await knex('users').select('*')
  return users
}

//create user into db
exports.insert = async (userData) => {

  const {username, password} = userData

  // Hash the password with 10 rounds of salt
  const hash = await bcrypt.hash(password, 10)

  // delete plaintext password
  delete userData.password

  // Insert the user into the database and return
  const result = await knex('users').insert({
    ...userData,
    username: username,
    password: hash //store the hash. DO NOT store a plaintext password!
  }).returning(['id', 'username', 'permission']) // return the data you need excluding the password

  return result
}

//find user in the database that matches username 
exports.findByUsername = async (username) => {
  // Find the first user in the database with the username
const user = await knex('users')
  .where('username', username)
  .first('*')
return user
}

//update information of user with specific id from db
exports.modifyById = async (id, data) => {
  // update the user with matching id in db and return the user
  const result = await knex('users')
    .where('id', '=', id)
    .update(data)
    .returning('*') // returning is used to return data after an update

  console.log('modifyById result: ', result[0])

  return result[0]
}

//delete user with specific id from db
exports.deleteById = async (id) => {
  // delete the user with matching id in db and return the user id
  const result = await knex('users')
    .where('id', '=', id)
    .delete()
    .returning('id') // returning is used to return data after an update

  console.log('deleteById result: ', result[0].id)

  return result[0].id
}
