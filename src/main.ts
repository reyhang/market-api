import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // import built-in ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
        transform: true, // Veri tipi degisimi yapabilmemiz icin aktif edildi.
        disableErrorMessages: false, // Hata mesajlarinda anlamli metin donmesini saglar/
        whitelist: true, // Whitelist acmazsak asagidaki iki kurali kullanamayiz.
        forbidNonWhitelisted: true, //  Alttaki kurali yazmama izin veriyor
        forbidUnknownValues: true, // POST,GET,PATCH,DELETE bilinmeyten deger gelmesini engelller.
    }),)
   await app.listen(3000);
  
}
bootstrap();
