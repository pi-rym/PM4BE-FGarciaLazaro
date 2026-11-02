import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Put("uploadImage/:id")
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(@Param("id", ParseUUIDPipe) imageId: string, @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 200 * 1024, message: "La imagen debe pesar menos de 200 KB" }),
      new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/, errorMessage: "La imagen debe ser JPG, PNG o WEBP" }),
    ],
  })) file: Express.Multer.File){
return this.fileUploadService.uploadImage(imageId, file);
  }
}
