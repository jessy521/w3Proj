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
  // it's thr default constructor
  constructor(
    @Inject('AUDIO_MODEL')
    private audioModel: Model<Audio>,
  ) {}

  // function to create a new document
  async create(createAudioDto: CreateAudioDto): Promise<Audio> {
    // console.log(file);
    const createdCat = new this.audioModel(createAudioDto);
    return createdCat.save();
  }

  // function to get the extension
  getFileExtension(filename: string): string {
    console.log(filename);
    const extension = filename.substring(
      filename.lastIndexOf('.') + 1,
      filename.length,
    );
    return extension;
  }

  // function to upload files
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

  // function to calculate the durations
  async checkDuration(arrayToUpload: any) {
    let sumOfDuration = await this.audioModel //mongoDB aggregation
      .aggregate([
        { $match: {} },
        { $group: { _id: null, sum: { $sum: '$duration' } } },
      ])
      .then((res) => {
        return res[0] ? res[0].sum : 0;
      });

    const sumOfUploadedDuration = arrayToUpload.reduce(
      (sum, file) => sum + file.duration,
      0,
    );
    console.log(sumOfUploadedDuration + ' ' + sumOfDuration);
    if (sumOfUploadedDuration + sumOfDuration >= 600) {
      return 0;
    } else return 1;
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
