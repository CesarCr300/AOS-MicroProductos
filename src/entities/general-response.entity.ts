export class GeneralResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
