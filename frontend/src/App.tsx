import { useEffect, useState, type CSSProperties } from "react"
import "./App.css"
import type { Contact } from "./Contact"

const apiEndpoint = "http://127.0.0.1:9999/contact"
function App() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [isAddContactOpen, setAddContactState] = useState(false)

    useEffect(() => {
        fetch(apiEndpoint, { method: "get" }).then((res) => res.json().then((data) => setContacts(data)))
    }, [])

    return (
        <div>
            <h1>Contact book</h1>
            <button
                onClick={() => {
                    setAddContactState(true)
                }}
            >
                Add Contact
            </button>
            {isAddContactOpen ? <AddContactWindow onClose={() => setAddContactState(false)} /> : <></>}

            <ContactList contacts={contacts}></ContactList>
        </div>
    )
}

function ContactList({ contacts }: { contacts: Contact[] }) {
    return (
        <ul>
            {contacts.map((c) => (
                <li key={c.id}>
                    <div className="contact-info">
                        <strong>{c.name}</strong>
                        <br></br>
                        {c.phone}
                    </div>
                </li>
            ))}
        </ul>
    )
}

function AddContactWindow({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const onSubmit = () => {
        console.log({ name: name, phone: phone })
    }

    return (
        <div style={windowStyle}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="name"></input>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="phone number"></input>
            <button onClick={onSubmit}>Submit</button>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

const windowStyle: CSSProperties = {
    border: "1px solid #ccc",
    padding: "1rem",
    background: "rgba(48, 47, 47, 0.82)",
    position: "fixed",
    top: "30%",
    left: "40%",
    width: "300px",
    boxShadow: "0 0 10px rgba(29, 29, 29, 0.2)"
}

export default App
