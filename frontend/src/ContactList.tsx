import type { Contact } from "./Contact";
import "./main.css";

export function ContactList({
    contacts,
    onEdit,
    onDelete
}: {
    contacts: Contact[];
    onEdit: (c: Contact) => void;
    onDelete: (c: Contact) => void;
}) {
    return (
        <ul className="contact-list">
            {contacts.map((c) => (
                <li
                    key={c.id}
                    className="contact-item"
                >
                    <div className="contact-info">
                        <h3>{c.name}</h3>
                        <p>{c.phone}</p>
                    </div>
                    <div className="contact-actions">
                        <button onClick={() => onEdit(c)}>Edit</button>
                        <button onClick={() => onDelete(c)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
