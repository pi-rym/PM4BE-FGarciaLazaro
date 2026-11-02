import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/enviroment';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  app.useGlobalFilters(new DatabaseExceptionFilter())

const loggerMiddleware = new LoggerMiddleware()
app.use(loggerMiddleware.use)

const PORT = environment.PORT;
const HOST = environment. HOST

  await app.listen(process.env.PORT ?? 3000);

  console.log(`Serveer online on http://${HOST}:${PORT}/`);

}
bootstrap();
