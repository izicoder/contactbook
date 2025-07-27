import express from "express"
import cors from "cors"
import router from "./apiRouter"

const server = express()
server.use(cors())
server.use(express.json())

// logging
server.use(async (req, res, next) => {
    const date = new Date()
    console.log(`request from ${req.ip} at ${date.toLocaleString()} with`)
    console.log(req.headers)
    console.log(req.body)
    next()
})

server.use("/contact", router)

const port = 9999
server.listen(port, () => console.log(`running on ${port}`))
