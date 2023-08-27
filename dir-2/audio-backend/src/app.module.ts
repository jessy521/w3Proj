import { Module } from '@nestjs/common';
import { AudioModule } from './audio/audio.module';

@Module({
  // Import the AudioModule to be used within this module
  imports: [AudioModule],
})
export class AppModule {}
