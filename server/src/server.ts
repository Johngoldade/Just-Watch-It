

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import routes from './routes/index.js'
import sequelize from './config/connection.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static('../client/dist'))

app.use(express.json())
app.use(routes)

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})
