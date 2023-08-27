import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

// Main application bootstrapping function
async function bootstrap() {
  // Create a Nest application instance
  const app = await NestFactory.create(AppModule, { cors: true });

  // Set a global prefix for all routes (i.e., 'api')
  app.setGlobalPrefix('api');

  // Enable JSON parsing middleware with increased size limit
  app.use(json({ limit: '50mb' }));

  // Enable URL-encoded parsing middleware with increased size limit and extended mode
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Start listening on port 3001
  await app.listen(3001);
}

// Call the bootstrap function to start the application
bootstrap();
