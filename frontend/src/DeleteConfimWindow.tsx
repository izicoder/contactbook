import type { Contact } from "./Contact";
import "./window.css";

export function DeleteConfirm({
    contact,
    onDelete,
    onClose
}: {
    contact: Contact;
    onDelete: (c: Contact) => void;
    onClose: () => void;
}) {
    return (
        <div className="window">
            <form onSubmit={(e) => e.preventDefault()}>
                <h2>Delete contact?</h2>
                <button
                    type="submit"
                    onClick={() => onDelete(contact)}
                >
                    Yes
                </button>
                <button
                    type="button"
                    className="cancel-button"
                    onClick={onClose}
                >
                    No
                </button>
            </form>
        </div>
    );
}
