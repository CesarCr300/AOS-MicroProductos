import { HttpStatus } from '@nestjs/common';

import { GeneralResponse } from '../entities/general-response.entity';

export class GeneralResponseUtil {
  static Status<T>(
    message: string,
    data: T,
    status: number,
  ): GeneralResponse<T> {
    const response = new GeneralResponse<T>();
    response.message = message;
    response.data = data;
    response.statusCode = status;
    return response;
  }
  static OK<T>(message: string, data: T): GeneralResponse<T> {
    return GeneralResponseUtil.Status<T>(message, data, HttpStatus.OK);
  }

  static BAD_REQUEST<T>(message: string, data: T): GeneralResponse<T> {
    return GeneralResponseUtil.Status<T>(message, data, HttpStatus.BAD_REQUEST);
  }

  static INTERNAL_SERVER_ERROR<T>(
    message: string,
    data: T,
  ): GeneralResponse<T> {
    return GeneralResponseUtil.Status<T>(
      message,
      data,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static NOT_FOUND<T>(message: string, data: T): GeneralResponse<T> {
    return GeneralResponseUtil.Status<T>(message, data, HttpStatus.NOT_FOUND);
  }
}
