import { DatabaseModule } from 'src/database/database.module';
import { AudioController } from './controller/audio.controller';
import { AudioService } from './service/audio.service';
import { audioProviders } from './provider/audio.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [AudioController],
  providers: [...audioProviders, AudioService],
})
export class AudioModule {}
