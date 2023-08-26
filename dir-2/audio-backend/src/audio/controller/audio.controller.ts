import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AudioService } from '../service/audio.service';
import { CreateAudioDto } from '../dto/create.audio';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';

export const audioStorage = {
  storage: diskStorage({
    destination: './uploads/songs',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', audioStorage))
  async create(@Body() createAudioDto: CreateAudioDto, @UploadedFile() file) {
    console.log(file);
    return this.audioService.create(createAudioDto);
  }

  @Get()
  findAll() {
    return this.audioService.findAll();
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor(audioStorage))
  async uploadFile(
    // @Body() createAudioDto: CreateAudioDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    return this.audioService.upload(files, res);
  }

  @Get('uploads/songs/:name')
  async getFile(@Param('name') name: string, @Res() res: Response) {
    console.log(name);
    return this.audioService.getFile(name, res);
  }
}
