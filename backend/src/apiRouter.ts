import { Router } from "express"
import db from "./db"
import { v4 as uuidv4 } from "uuid"
import { error } from "console"

const apiRouter = Router()

apiRouter.get("/", async (req, res) => {
    await db.read()
    res.json(db.data.contacts)
})

apiRouter.post("/", async (req, res) => {
    if (!req.body.name || !req.body.phone) return res.status(400).json({ error: "Wrong/missing name or phone" })
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
    if (!req.body.name || !req.body.phone) return res.status(400).json({ error: "Wrong/missing name or phone" })
    const { name, phone } = req.body

    const id = req.params.id

    await db.read()
    const contact = db.data.contacts.find((c) => c.id === id)

    if (!contact) return res.status(400).json({ error: "cant find contact" })

    contact.name = name
    contact.phone = phone
    await db.write()
    res.json(contact)
})

// returns deleted object
apiRouter.delete("/:id", async (req, res) => {
    const id = req.params.id

    await db.read()
    let contactIndex: number | null = null
    db.data.contacts.find((c, idx) => {
        if (c.id === id) {
            contactIndex = idx
            return true
        }
    })
    console.log(contactIndex)
    if (contactIndex === null) return res.status(400).json({ error: "cant find contact" })

    const deleted = db.data.contacts.splice(contactIndex, 1)
    await db.write()

    res.json(deleted.pop())
})

export default apiRouter
