import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true); // prevent unknown field queries

  if (!process.env.MONGODB_URL) return console.log('MISSING MONGO_DB URL');

  if (isConnected) return console.log('MongoDb is already connected');

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'airbnb_nextjs13',
    });
    isConnected = true;
    console.log('mongo db is connected');
  } catch (err) {
    console.log('error connecting to db: ', err);
  }
};
