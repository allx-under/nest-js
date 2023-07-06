import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest app')
    .setDescription('APP Documentation')
    .setVersion('1.0.0')
    .addTag('Allx-under')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
}

start();
