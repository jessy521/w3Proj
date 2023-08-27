import { Connection } from 'mongoose';
import { audioSchema } from '../schema/audio.schema';

// Provider definition for the 'AUDIO_MODEL'
export const audioProviders = [
  {
    // Provide token, which is 'AUDIO_MODEL'
    provide: 'AUDIO_MODEL',

    // Use a factory function to create the model
    useFactory: (connection: Connection) =>
      connection.model('Audio', audioSchema),

    // Inject the 'DATABASE_CONNECTION' token
    inject: ['DATABASE_CONNECTION'],
  },
];

// TODO:  in production this provide token and injected token has to be passed in env
