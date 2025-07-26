import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

app.get("/contact", async (req, res) => {
    console.log(`request from ${req.ip}`)
    console.log(req.headers)
    res.json({ msg: "hello" })
})

const port = 9999
app.listen(port, () => console.log(`running on ${port}`))
