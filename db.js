import mongoose, { Schema } from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DB = process.env.MONGO_DB

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`


mongoose.set('strictQuery', true)

export const db = mongoose.connect(url)
    .then(() => console.log(`the ${MONGO_DB} database is loaded`))
    .catch((error) => console.error(`the ${MONGO_DB} database is not loaded`, error));

