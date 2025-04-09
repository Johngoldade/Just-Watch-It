// const forceDatabaseRefresh = true // Set to false once the app is up

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import routes from './routes/index.js'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    host: 'localhost',
    port: 5432,
    ssl: true,
    clientMinMessages: 'notice',
  });
  
  

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static('../client/dist'))

app.use(express.json())
app.use(routes)

sequelize.sync({ force: true }).then(() => {
    app.listen( PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})