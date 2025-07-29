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
