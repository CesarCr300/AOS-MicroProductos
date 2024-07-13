import { ManagedUpload } from 'aws-sdk/clients/s3';

export interface IImageManagerService {
  uploadImage(file: Express.Multer.File): Promise<ManagedUpload.SendData>;
  getImageUrl(key: string): Promise<string>;
  deleteImage(key: string): Promise<boolean>;
}

export const IImageManagerService = Symbol('IImageManagerService');
