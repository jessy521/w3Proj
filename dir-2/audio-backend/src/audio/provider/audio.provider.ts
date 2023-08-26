import { Connection } from 'mongoose';
import { audioSchema } from '../schema/audio.schema';

export const audioProviders = [
  {
    provide: 'AUDIO_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Audio', audioSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
