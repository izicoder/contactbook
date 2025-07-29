import { useState } from "react";
import type { Contact } from "./Contact";
import "./window.css";

export function EditContactWindow({
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
        <div className="window">
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
