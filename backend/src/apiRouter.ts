import { Router } from "express"

const apiRouter = Router()

apiRouter.get("/", (req, res) => {
    res.json({ msg: "hi from get" })
})

apiRouter.post("/", (req, res) => {
    res.json({ msg: "hi from post" })
})

apiRouter.put("/:id", (req, res) => {
    res.json({ msg: "hi from put" })
})

apiRouter.delete("/:id", (req, res) => {
    res.json({ msg: "hi from delete" })
})

export default apiRouter
