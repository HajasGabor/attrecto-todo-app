import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Morgan middleware konfigurálása
  app.use(morgan('dev'));

  // Configure CORS middleware
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
