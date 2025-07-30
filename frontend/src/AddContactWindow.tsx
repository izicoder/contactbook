import { useState } from "react";
import "./window.css";

export function AddContactWindow({
    onClose,
    onSubmit,
    onError
}: {
    onClose: () => void;
    onSubmit: (name: string, phone: string) => void;
    onError: (message: string) => void;
}) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <div className="window">
            <h2>Add Contact</h2>
            <form onSubmit={(e) => e.preventDefault()}>
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
                <button
                    type="submit"
                    onClick={() => {
                        if (!name || !phone) {
                            onError("Missing name or phone number");
                        } else {
                            onSubmit(name, phone);
                        }
                    }}
                >
                    Add
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
