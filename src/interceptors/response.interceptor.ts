import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { env } from 'process';
import { Observable, catchError, map, throwError } from 'rxjs';

import { GeneralResponse } from '../entities/general-response.entity';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    const statusCode = response.statusCode;

    const generalResponse: GeneralResponse<any> = {
      statusCode: statusCode,
      data: res,
      message: 'La operación se realizó con éxito',
    };

    return generalResponse;
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      env.NODE_ENV == 'development'
        ? exception.message
        : 'Hubo un error interno';

    const generalResponse: GeneralResponse<null> = {
      statusCode: status,
      message,
      data: null,
    };

    response.status(status).json(generalResponse);
  }
}
