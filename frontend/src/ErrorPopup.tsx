import { useEffect } from "react";
import "./window.css";

export function ErrorPopUp({ timer, message, onTimeout }: { timer: number; message: string; onTimeout: () => void }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onTimeout();
        }, timer);
        return () => clearTimeout(timeout);
    }, []);

    return <div className="popup">{message}</div>;
}
