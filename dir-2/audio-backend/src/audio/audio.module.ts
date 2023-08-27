import { DatabaseModule } from 'src/database/database.module';
import { AudioController } from './controller/audio.controller';
import { AudioService } from './service/audio.service';
import { audioProviders } from './provider/audio.provider';
import { Module } from '@nestjs/common';

@Module({
  // Import the DatabaseModule to be used within this module
  imports: [DatabaseModule],

  // Declare the controller to be associated with this module
  controllers: [AudioController],

  // Declare the providers (services and other providers) for this module
  // including audioProviders and AudioService
  providers: [...audioProviders, AudioService],
})
export class AudioModule {}
