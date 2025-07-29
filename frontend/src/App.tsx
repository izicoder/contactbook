import { useEffect, useState } from "react";
import "./main.css";
import type { Contact } from "./Contact";
import { ContactList } from "./ContactList";
import { AddContactWindow } from "./AddContactWindow";
import { EditContactWindow } from "./EditContactWindow";

const apiEndpoint = "http://127.0.0.1:9999/contact";

type WindowState = "closed" | "editing" | "adding";

function App() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
    const [windowState, setWindowState] = useState<WindowState>("closed");

    const fetchContacts = () => {
        fetch(apiEndpoint, { method: "get" }).then((res) => res.json().then((data) => setContacts(data)));
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const addContact = async (name: string, phone: string) => {
        const res = await fetch(apiEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, phone: phone })
        });
        if (res.ok) fetchContacts();
    };

    const editContact = async (contact: Contact) => {
        const res = await fetch(`${apiEndpoint}/${contact.id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        });
        if (res.ok) fetchContacts();
    };

    const deleteContact = async (contact: Contact) => {
        const res = await fetch(`${apiEndpoint}/${contact.id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: contact.id })
        });
        if (res.ok) fetchContacts();
    };

    const renderWindows = () => {
        switch (windowState) {
            case "adding": {
                return (
                    <AddContactWindow
                        onClose={() => setWindowState("closed")}
                        onSubmit={addContact}
                    />
                );
            }
            case "editing": {
                if (contactToEdit !== null) {
                    return (
                        <EditContactWindow
                            contact={contactToEdit}
                            onClose={() => setWindowState("closed")}
                            onSubmit={(newName, newPhone) => {
                                editContact({ id: contactToEdit.id, name: newName, phone: newPhone });
                            }}
                        />
                    );
                } else return <></>;
            }
            case "closed": {
                return <></>;
            }
        }
    };

    return (
        <>
            <div className="top">
                <h1>Contact book</h1>
                <button
                    onClick={() => {
                        setWindowState("adding");
                    }}
                >
                    Add Contact
                </button>
            </div>
            <div>
                {renderWindows()}

                <ContactList
                    contacts={contacts}
                    onEdit={(c) => {
                        setContactToEdit(c);
                        setWindowState("editing");
                    }}
                    onDelete={(c) => {
                        deleteContact(c);
                    }}
                ></ContactList>
            </div>
        </>
    );
}

export default App;
