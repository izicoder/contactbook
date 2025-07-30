import { useState } from "react";
import type { Contact } from "./Contact";
import "./window.css";

export function EditContactWindow({
    contact,
    onSubmit,
    onClose,
    onError
}: {
    contact: Contact;
    onSubmit: (c: Contact) => void;
    onClose: () => void;
    onError: (message: string) => void;
}) {
    const [newName, setName] = useState(contact.name);
    const [newPhone, setPhone] = useState(contact.phone);

    return (
        <div className="window">
            <h2>Edit Contact</h2>
            <form onSubmit={(e) => e.preventDefault()}>
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
                <button
                    type="submit"
                    onClick={() => {
                        if (!newName || !newPhone) {
                            onError("Missing name or phone number");
                        } else {
                            onSubmit({ id: contact.id, name: newName, phone: newPhone });
                        }
                    }}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="cancel-button"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
