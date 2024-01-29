import express from "express";
import cors from 'cors';
import helmet from "helmet";
import route from "./routes/index.js";

const app = express()

// Allow Cross-Origin requests
app.use(cors())

// Set security HTTP headers
app.use(helmet())

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '15kb' }))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).json({ success: true, error: null, data: 'The JIN V2 APIs provider :)' })
})

// Routes [[ Make sure keep protected route at the end ]]
app.use('/', route)

//export default app
export default app