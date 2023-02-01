import {
  Controller,
  Post,
  Headers,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/fileUpload.utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsData } from './dto/upload-data.dto';
import { UserDataDto } from 'src/dto/user-data.dto';

@ApiTags('Загрузка изображений')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @ApiOperation({
    summary:
      'Загрузка фотографий на бэкенд. Принимаются форматы: jpg, jpeg, png, webp (до 20мб).',
  })
  @ApiResponse({
    status: 200,
    type: UploadsData,
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async upload(
    @Headers('user') user: UserDataDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1000 * 20,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<UploadsData> {
    return this.uploadsService.upload(user, file);
  }
}
