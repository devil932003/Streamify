import {StreamChat} from 'stream-chat';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Missing Stream API credentials");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret); 

export const upsertSreamUser = async(userData) => {
    try{
await streamClient.upsertUsers([userData]);
return userData;
    }
    catch(error){
console.error("Error upserting user in Stream:", error);
    }
}

export const generateStreamToken = (userId) => {}