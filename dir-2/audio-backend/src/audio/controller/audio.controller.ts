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

// Storage configuration for uploaded audio files
export const audioStorage = {
  storage: diskStorage({
    destination: './uploads/songs', // Destination directory for storing files
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4(); // Generate a unique filename
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

// Controller for audio-related routes
@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  // API endpoint to create an audio document
  @UseInterceptors(FileInterceptor('file', audioStorage)) // Intercept and store the uploaded file
  async create(@Body() createAudioDto: CreateAudioDto, @UploadedFile() file) {
    // console.log(file); // Log the uploaded file details
    return this.audioService.create(createAudioDto);
  }

  @Get()
  // API endpoint to get all audio documents
  findAll() {
    return this.audioService.findAll();
  }

  @Post('upload')
  // API endpoint to upload multiple files
  @UseInterceptors(AnyFilesInterceptor(audioStorage)) // Intercept and store multiple uploaded files
  async uploadFile(
    // @Body() createAudioDto: CreateAudioDto,
    @UploadedFiles() files: Array<Express.Multer.File>, // Uploaded files array
    @Res() res: Response,
  ) {
    return this.audioService.upload(files, res); // Call the service function to handle upload
  }

  @Get('uploads/songs/:name')
  // API endpoint to get a specific audio file
  async getFile(@Param('name') name: string, @Res() res: Response) {
    // console.log(name); // Log the requested audio file name
    return this.audioService.getFile(name, res); // Call the service function to serve the file
  }
}
