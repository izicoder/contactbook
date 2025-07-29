import { useEffect, useState } from "react";
import "./main.css";
import type { Contact } from "./Contact";
import { ContactList } from "./ContactList";
import { AddContactWindow } from "./AddContactWindow";
import { EditContactWindow } from "./EditContactWindow";
import parsePhoneNumber from "libphonenumber-js";
import { ErrorPopUp } from "./ErrorPopup";

const apiEndpoint = "http://127.0.0.1:9999/contact";

type WindowState = "closed" | "editing" | "adding";

function isValidPhoneNumber(phone: string): boolean {
    const parsed = parsePhoneNumber(phone);
    if (parsed?.isValid()) return true;
    else return false;
}

function jsonFetch(url: RequestInfo | URL, method: string = "get", jsonBody: any): Promise<Response> {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonBody)
    });
}

function App() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
    const [windowState, setWindowState] = useState<WindowState>("closed");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchContacts = () => {
        fetch(apiEndpoint, { method: "get" }).then((res) => res.json().then((data) => setContacts(data)));
    };

    const popError = (msg: string) => {
        setErrorMessage(msg);
        setShowError(true);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const addContact = async (name: string, phone: string) => {
        if (isValidPhoneNumber(phone)) {
            const res = await jsonFetch(apiEndpoint, "post", { name: name, phone: phone });
            if (res.ok) fetchContacts();
            else {
                const text = await res.text();
                popError(text);
            }
        } else {
            popError("Invalid phone number");
        }
    };

    const editContact = async (contact: Contact) => {
        if (isValidPhoneNumber(contact.phone)) {
            const res = await jsonFetch(`${apiEndpoint}/${contact.id}`, "put", contact);
            if (res.ok) fetchContacts();
            else {
                const text = await res.text();
                popError(text);
            }
        } else {
            popError("Invalid phone number");
        }
    };

    const deleteContact = async (contact: Contact) => {
        const res = await jsonFetch(`${apiEndpoint}/${contact.id}`, "delete", { id: contact.id });
        if (res.ok) fetchContacts();
        else {
            const text = await res.text();
            popError(text);
        }
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
                            onSubmit={editContact}
                        />
                    );
                } else {
                    popError("Oops");
                    return <></>;
                }
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
            {showError && (
                <ErrorPopUp
                    timer={2000}
                    message={errorMessage}
                    onTimeout={() => {
                        setErrorMessage("");
                        setShowError(false);
                    }}
                />
            )}
        </>
    );
}

export default App;
