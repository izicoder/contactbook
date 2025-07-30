import { Router } from "express";
import db from "./db";
import { v4 as uuidv4 } from "uuid";
import parsePhoneNumber from "libphonenumber-js";

const apiRouter = Router();

function isValidPhoneNumber(phone: string): boolean {
    const parsed = parsePhoneNumber(phone);
    if (parsed?.isValid()) return true;
    else return false;
}

function formatPhoneNumber(phone: string): string {
    const parsed = parsePhoneNumber(phone);
    if (!parsed) throw "Error while formatting phone number";
    else return parsed.formatInternational();
}

apiRouter.get("/", async (req, res) => {
    await db.read();
    res.json(db.data.contacts.reverse());
});

apiRouter.post("/", async (req, res) => {
    if (!req.body.name || !req.body.phone) return res.status(400).json({ error: "Missing name or phone" });
    const { name, phone } = req.body;
    if (!isValidPhoneNumber(phone)) return res.status(400).json({ error: "Invalid phone number" });

    const newContact = {
        id: uuidv4(),
        name: name,
        phone: formatPhoneNumber(phone)
    };
    db.data.contacts.push(newContact);
    await db.write();

    res.json(newContact);
});

apiRouter.put("/:id", async (req, res) => {
    if (!req.body.name || !req.body.phone) return res.status(400).json({ error: "Missing name or phone" });
    const { name, phone } = req.body;
    if (!isValidPhoneNumber(phone)) return res.status(400).json({ error: "Invalid phone number" });

    const id = req.params.id;

    await db.read();
    const contact = db.data.contacts.find((c) => c.id === id);

    if (!contact) return res.status(400).json({ error: `Cant find contact ${id}` });

    contact.name = name;
    contact.phone = formatPhoneNumber(phone);
    await db.write();
    res.json(contact);
});

// returns deleted object
apiRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;

    await db.read();
    let contactIndex: number | null = null;
    db.data.contacts.find((c, idx) => {
        if (c.id === id) {
            contactIndex = idx;
            return true;
        }
    });
    if (contactIndex === null) return res.status(400).json({ error: `Cant find contact ${id}` });

    const deleted = db.data.contacts.splice(contactIndex, 1);
    await db.write();

    res.json(deleted.pop());
});

export default apiRouter;
