import mongoose from 'mongoose';
import { DB_NAME } from '../constants/db';
import { Messages } from '../constants/messages';

export const connectToDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString) throw new Error(Messages.MONGO_CONNECTION_STRING_MISSING);
        const connectionInstance = await mongoose.connect(`${connectionString}/${DB_NAME}`);

        console.log(`${Messages.MONGO_CONNECTION_SUCCESSFUL}${connectionInstance.connection.host}\n`);
    } catch (error) {
        console.log(Messages.MONGO_CONNECTION_ERROR, error);
        process.exit(1);
    }
};
