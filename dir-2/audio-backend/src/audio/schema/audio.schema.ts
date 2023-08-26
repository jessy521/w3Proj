import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const audioSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  fileSize: Number,
  extension: String,
  dateOfUpload: Date,
  src: String,
  type: String,
});
