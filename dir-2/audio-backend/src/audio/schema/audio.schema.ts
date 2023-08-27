import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the audio schema for MongoDB
export const audioSchema = new mongoose.Schema({
  name: String, // Name of the audio file
  duration: Number, // Duration of the audio in seconds
  fileSize: Number, // Size of the audio file in bytes
  extension: String, // Extension of the audio file (e.g., mp3)
  dateOfUpload: Date, // Date when the audio was uploaded
  src: String, // Path to the audio file
  type: String, // MIME type of the audio (e.g., audio/mpeg)
});
