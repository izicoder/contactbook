import type { Contact } from "./Contact";

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
