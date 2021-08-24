import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import noteRouter from './routers/noteRouter.js'

const app = express()
dotenv.config()


app.use('/notes', noteRouter)


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
        .then(() => console.log('connected to database'))
        .catch((err) => console.log(err))
})