require('dotenv').config()
const express = require('express')

const app = express()
const port = 9000
const allRoutes = require('./routes/allRoutes')
const cors = require('cors')

app.use(cors()) // to allow localhost cors

//body-parser
app.use(express.json()) // for parsing application/json

// use the routes from './routes/allRoutes'
app.use('/', allRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})