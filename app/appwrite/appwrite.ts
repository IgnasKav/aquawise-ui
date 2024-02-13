import { Client, Account, Databases } from 'appwrite';

const APWRITE_URL = process.env.NEXT_PUBLIC_APPWRITE_URL;
const APPWRITE_ID = process.env.NEXT_PUBLIC_APPWRITE_ID;

const client = new Client();
client.setEndpoint(APWRITE_URL!).setProject(APPWRITE_ID!);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
export { ID } from 'appwrite';
