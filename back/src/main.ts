import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger/logger.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

const loggerMiddleware = new LoggerMiddleware()
app.use(loggerMiddleware.use)

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
