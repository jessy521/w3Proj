// Interface defining the structure of an 'Audio' object
export interface Audio {
  name: string; // Name of the audio file
  duration: number; // Duration of the audio in seconds
  fileSize: number; // Size of the audio file in bytes
  extension: string; // Extension of the audio file (e.g., mp3)
  dateOfUpload: Date; // Date when the audio was uploaded
  src: string; // Path to the audio file
  type: string; // MIME type of the audio (e.g., audio/mpeg)
}
