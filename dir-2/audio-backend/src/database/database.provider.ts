import * as mongoose from 'mongoose';

// Provider definition for creating a MongoDB connection
export const databaseProviders = [
  {
    // Provide token, which is 'DATABASE_CONNECTION'
    provide: 'DATABASE_CONNECTION',

    // Use a factory function to establish the MongoDB connection
    useFactory: (): Promise<typeof mongoose> =>
      // TODO: Change the URL to connect to your preferred MongoDB instance
      mongoose.connect('mongodb://localhost:27017/threeway'), // Connection URL
  },
];
