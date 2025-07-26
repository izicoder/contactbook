import express from "express"
import cors from "cors"
import router from "./apiRouter"

const app = express()
app.use(cors())
app.use(express.json())

// logging
app.use((req, res, next) => {
    const date = new Date()
    console.log(`request from ${req.ip} at ${date.toLocaleString()} with`)
    console.log(req.headers)
    next()
})

app.use("/contact", router)

const port = 9999
app.listen(port, () => console.log(`running on ${port}`))
