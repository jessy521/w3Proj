import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Audio } from '../interface/audio.interface';
import { CreateAudioDto } from '../dto/create.audio';
const path = require('path');
import { Response } from 'express';
const { getAudioDurationInSeconds } = require('get-audio-duration');

@Injectable()
export class AudioService {
  // Constructor that injects the Audio model (database) dependency
  constructor(
    @Inject('AUDIO_MODEL')
    private audioModel: Model<Audio>,
  ) {}

  // function to create a new document
  async create(createAudioDto: CreateAudioDto): Promise<Audio> {
    const createdCat = new this.audioModel(createAudioDto);
    return createdCat.save();
  }

  // Function to extract file extension from a filename
  getFileExtension(filename: string): string {
    console.log(filename);
    const extension = filename.substring(
      filename.lastIndexOf('.') + 1,
      filename.length,
    );
    return extension;
  }

  // Function to upload audio files and store their data in the database
  async upload(files: any, res: Response) {
    try {
      let arrayToUpload = [];

      var promises = files.map(async (file: any) => {
        const filePath = path.join(__dirname, '../../../', file['path']);

        const payLoad: Audio = {
          name: file['originalname'],
          duration: await getAudioDurationInSeconds(filePath).then(
            (duration) => {
              return duration;
            },
          ),
          fileSize: file['size'],
          extension: this.getFileExtension(file['originalname']),
          src: file['path'],
          type: file['mimetype'],
          dateOfUpload: new Date(),
        };

        arrayToUpload.push(payLoad);
      });

      Promise.all(promises).then(async () => {
        //after the promises we are uploading them on DB
        if (await this.checkDuration(arrayToUpload)) {
          this.audioModel.insertMany(arrayToUpload);
          res.status(201).send('Success');
        } else res.status(403).send('Files total duration may exceeds 10 mins');
      });
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  // function to get all the documents from the DB
  async findAll(): Promise<Audio[]> {
    return this.audioModel.find().exec();
  }

  // Function to calculate the total duration and check if it's within limit
  async checkDuration(arrayToUpload: any) {
    // Calculate sum of duration from existing records
    let sumOfDuration = await this.audioModel //mongoDB aggregation
      .aggregate([
        { $match: {} },
        { $group: { _id: null, sum: { $sum: '$duration' } } },
      ])
      .then((res) => {
        return res[0] ? res[0].sum : 0;
      });

    // Calculate sum of durations from uploaded files
    const sumOfUploadedDuration = arrayToUpload.reduce(
      (sum, file) => sum + file.duration,
      0,
    );
    // console.log(sumOfUploadedDuration + ' ' + sumOfDuration);
    // Compare total durations and return result
    if (sumOfUploadedDuration + sumOfDuration >= 600) {
      return 0; // Exceeds the limit
    } else return 1; // Within limit
  }

  // function to get the exact audio file
  async getFile(fileName: string, res: Response) {
    try {
      const filePath = path.join(
        __dirname,
        '../../../uploads/songs/',
        fileName,
      );
      console.log(filePath);
      res.sendFile(filePath);
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}
