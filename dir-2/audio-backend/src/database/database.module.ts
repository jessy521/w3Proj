import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

@Module({
  // Declare providers for the module
  providers: [...databaseProviders],

  // Export the providers to be used by other modules
  exports: [...databaseProviders],
})
export class DatabaseModule {}
