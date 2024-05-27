import { HttpStatus } from '@nestjs/common';

import { GeneralResponseUtil } from '../../src/utils/general-response.util';

describe('GeneralResponseUtil', () => {
  describe('Status', () => {
    it('should return a GeneralResponse object with the specified message, data, and status', () => {
      const message = 'Success';
      const data = { id: 1, name: 'John' };
      const status = HttpStatus.OK;

      const result = GeneralResponseUtil.Status(message, data, status);

      expect(result.message).toBe(message);
      expect(result.data).toBe(data);
      expect(result.statusCode).toBe(status);
    });
  });

  describe('OK', () => {
    it('should return a GeneralResponse object with HttpStatus.OK status', () => {
      const message = 'Success';
      const data = { id: 1, name: 'John' };

      const result = GeneralResponseUtil.OK(message, data);

      expect(result.message).toBe(message);
      expect(result.data).toBe(data);
      expect(result.statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('BAD_REQUEST', () => {
    it('should return a GeneralResponse object with HttpStatus.BAD_REQUEST status', () => {
      const message = 'Bad request';
      const data = {};

      const result = GeneralResponseUtil.BAD_REQUEST(message, data);

      expect(result.message).toBe(message);
      expect(result.data).toBe(data);
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('INTERNAL_SERVER_ERROR', () => {
    it('should return a GeneralResponse object with HttpStatus.INTERNAL_SERVER_ERROR status', () => {
      const message = 'Internal server error';
      const data = {};

      const result = GeneralResponseUtil.INTERNAL_SERVER_ERROR(message, data);

      expect(result.message).toBe(message);
      expect(result.data).toBe(data);
      expect(result.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('NOT_FOUND', () => {
    it('should return a GeneralResponse object wit HttpStatus.NOT_FOUNDh status', () => {
      const message = 'Not found';
      const data = {};

      const result = GeneralResponseUtil.NOT_FOUND(message, data);

      expect(result.message).toBe(message);
      expect(result.data).toBe(data);
      expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
