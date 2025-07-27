import { useEffect, useState } from "react"
import "./App.css"

const apiEndpoint = "http://127.0.0.1:9999/contact"
type Contact = {
    id: string
    name: string
    phone: string
}

function App() {
    const [contacts, setContacts] = useState<Contact[]>([])

    useEffect(() => {
        fetch(apiEndpoint, { method: "get" }).then((res) => res.json().then((data) => setContacts(data)))
    }, [])

    return (
        <div>
            <h1>Contact book</h1>
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

export default App
