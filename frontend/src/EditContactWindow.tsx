import { useState } from "react";
import type { Contact } from "./Contact";
import "./window.css";

export function EditContactWindow({
    contact,
    onSubmit,
    onClose
}: {
    contact: Contact;
    onSubmit: (c: Contact) => void;
    onClose: () => void;
}) {
    const [newName, setName] = useState(contact.name);
    const [newPhone, setPhone] = useState(contact.phone);
    const [error, setError] = useState("");

    return (
        <div className="window">
            <h2>Edit Contact</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!newName || !newPhone) {
                        setError("Invalid phone or name");
                    } else {
                        onSubmit({ id: contact.id, name: newName, phone: newPhone });
                        setError("");
                    }
                }}
            >
                <input
                    value={newName}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    value={newPhone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                />
                <button type="submit">Submit</button>
                <button
                    type="button"
                    className="cancel-button"
                    onClick={onClose}
                >
                    Cancel
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}
