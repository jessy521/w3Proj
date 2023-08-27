import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      // change the URL for connect with preferred MongoDB
      mongoose.connect('mongodb://localhost:27017/threeway'),
  },
];
