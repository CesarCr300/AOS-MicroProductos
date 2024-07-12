import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import { IImageManagerService } from '../interfaces/image-manager.interface.service';

@Injectable()
export class ImageManagerS3Service implements IImageManagerService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<ManagedUpload.SendData> {
    const { originalname, buffer } = file;
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    const uploadResult = await this.s3
      .upload({
        Bucket: bucketName,
        Body: buffer,
        Key: `${uuid()}-${originalname}`,
        ContentType: file.mimetype, // Set the content type based on the file
      })
      .promise();

    return uploadResult;
  }

  async getImageUrl(key: string): Promise<string> {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const params = {
      Bucket: bucketName,
      Key: key,
      Expires: 60 * 5, // URL expires in 5 minutes
    };

    const url = await this.s3.getSignedUrlPromise('getObject', params);
    return url;
  }
}
