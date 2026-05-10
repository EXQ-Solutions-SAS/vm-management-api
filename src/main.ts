import { NestFactory } from '@nestjs/core';
const cookieParser = require('cookie-parser');
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilitar Cookies 
  app.use(cookieParser());

  // 2. CORS configurado para permitir credenciales (Cookies) 
  app.enableCors({
    origin: [
      'http://localhost',      // Puerto 80 (Docker)
      'http://localhost:4200', // Puerto de desarrollo local
    ], 
    credentials: true,
  });

  // 3. Validaciones globales (Ej: no permitir RAM negativa) 
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  await app.listen(3000);
}
bootstrap();