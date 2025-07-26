import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

app.get("/contact", async (req, res) => {
    res.json({ msg: "hello" })
})
