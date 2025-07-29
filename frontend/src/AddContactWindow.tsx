import { useState } from "react";
import "./window.css";

export function AddContactWindow({
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
        <div className="window">
            <h2>Add Contact</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!name || !phone) {
                        setError("Invalid phone or name");
                    } else {
                        onSubmit(name, phone);
                        setError("");
                    }
                }}
            >
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    value={phone}
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
