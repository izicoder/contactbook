import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { join } from "path";

type Contact = {
    id: string;
    name: string;
    phone: string;
};

type Data = {
    contacts: Contact[];
};

const defaultData: Data = { contacts: [] };
const dbFilename = join(__dirname, "..", "db.json");
const adapter = new JSONFile<Data>(dbFilename);

const db = new Low(adapter, defaultData);

export default db;
