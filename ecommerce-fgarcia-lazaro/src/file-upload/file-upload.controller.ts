import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
// "import type" porque es solo un tipo y se usa en un parámetro con decorador (lo pide isolatedModules):
import type { AuthRequest } from 'src/auth/interfaces/auth-request.interface';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Put("uploadImage/:id")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(@Param("id", ParseUUIDPipe) imageId: string, @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 200 * 1024, message: "La imagen debe pesar menos de 200 KB" }),
      new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/, errorMessage: "La imagen debe ser JPG, PNG o WEBP" }),
    ],
  })) file: Express.Multer.File, @Req() request: AuthRequest){
return this.fileUploadService.uploadImage(imageId, file, request.user);
  }
}
