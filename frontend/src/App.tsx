import { useEffect, useState, type CSSProperties } from "react";
import "./App.css";
import type { Contact } from "./Contact";

const apiEndpoint = "http://127.0.0.1:9999/contact";
function App() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isAddWindowOpen, setAddWindowState] = useState(false);
    const [isEditWindowOpen, setEditWindowState] = useState(false);
    const [editID, setEditID] = useState("");

    const refreshContacts = () => {
        fetch(apiEndpoint, { method: "get" }).then((res) => res.json().then((data) => setContacts(data)));
    };

    useEffect(() => {
        refreshContacts();
    }, []);

    const addContact = async (name: string, phone: string) => {
        const res = await fetch(apiEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, phone: phone })
        });
        if (res.ok) refreshContacts();
    };

    const editContact = async (id: string, name: string, phone: string) => {
        const res = await fetch(`${apiEndpoint}/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, name: name, phone: phone })
        });
        if (res.ok) refreshContacts();
    };

    const deleteContact = async (id: string) => {
        const res = await fetch(`${apiEndpoint}/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        });
        if (res.ok) refreshContacts();
    };

    return (
        <div>
            <h1>Contact book</h1>
            <button
                onClick={() => {
                    setAddWindowState(true);
                }}
            >
                Add Contact
            </button>
            {isAddWindowOpen ? (
                <AddContactWindow
                    onClose={() => setAddWindowState(false)}
                    onSubmit={addContact}
                />
            ) : (
                <></>
            )}
            {isEditWindowOpen ? (
                <EditContactWindow
                    contact={contacts.filter((c) => c.id === editID)[0]}
                    onClose={() => setEditWindowState(false)}
                    onSubmit={(newName, newPhone) => {
                        editContact(editID, newName, newPhone);
                    }}
                />
            ) : (
                <></>
            )}

            <ContactList
                contacts={contacts}
                onEdit={(c) => {
                    setEditID(c.id);
                    setEditWindowState(true);
                }}
                onDelete={(c) => {
                    deleteContact(c.id);
                }}
            ></ContactList>
        </div>
    );
}

function ContactList({
    contacts,
    onEdit,
    onDelete
}: {
    contacts: Contact[];
    onEdit: (c: Contact) => void;
    onDelete: (c: Contact) => void;
}) {
    return (
        <ul>
            {contacts.map((c) => (
                <li key={c.id}>
                    <div className="contact-info">
                        <strong>{c.name}</strong>
                        <br></br>
                        {c.phone}
                    </div>
                    <button onClick={() => onEdit(c)}>Edit</button>
                    <button onClick={() => onDelete(c)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

function AddContactWindow({
    onClose,
    onSubmit
}: {
    onClose: () => void;
    onSubmit: (name: string, phone: string) => void;
}) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    return (
        <div style={windowStyle}>
            <h1>Add Contact</h1>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
            ></input>
            <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="phone number"
            ></input>
            <button
                onClick={() => {
                    if (!name || !phone) {
                        setError("Invalid phone or name");
                    } else {
                        onSubmit(name, phone);
                        setError("");
                    }
                }}
            >
                Submit
            </button>
            <button onClick={onClose}>Close</button>
            <div>{error}</div>
        </div>
    );
}

function EditContactWindow({
    contact,
    onSubmit,
    onClose
}: {
    contact: Contact;
    onSubmit: (name: string, phone: string) => void;
    onClose: () => void;
}) {
    const [newName, setName] = useState(contact.name);
    const [newPhone, setPhone] = useState(contact.phone);
    const [error, setError] = useState("");

    return (
        <div style={windowStyle}>
            <h1>Edit Contact</h1>
            <input
                value={newName}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
            ></input>
            <input
                value={newPhone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="phone number"
            ></input>
            <button
                onClick={() => {
                    if (!newName || !newPhone) {
                        setError("Invalid phone or name");
                    } else {
                        onSubmit(newName, newPhone);
                        setError("");
                    }
                }}
            >
                Submit
            </button>
            <button onClick={onClose}>Close</button>
            <div>{error}</div>
        </div>
    );
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
};

export default App;
