import { Router } from "express"
import db from "./db"
import { v4 as uuidv4 } from "uuid"

const apiRouter = Router()

apiRouter.get("/", async (req, res) => {
    await db.read()
    res.json(db.data.contacts)
})

apiRouter.post("/", async (req, res) => {
    if (!req.body.name || !req.body.phone) return res.status(400).json({ error: "Wrong name or phone" })
    const { name, phone } = req.body

    const newContact = {
        id: uuidv4(),
        name: name,
        phone: phone
    }
    db.data!.contacts.push(newContact)
    await db.write()

    res.json(newContact)
})

apiRouter.put("/:id", async (req, res) => {
    res.json({ msg: "hi from put" })
})

apiRouter.delete("/:id", async (req, res) => {
    res.json({ msg: "hi from delete" })
})

export default apiRouter
