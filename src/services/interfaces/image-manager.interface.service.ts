import { ManagedUpload } from 'aws-sdk/clients/s3';

export interface IImageManagerService {
  uploadImage(file: Express.Multer.File): Promise<ManagedUpload.SendData>;
  getImageUrl(key: string): Promise<string>;
  deleteImage(): Promise<void>;
}

export const IImageManagerService = Symbol('IImageManagerService');
