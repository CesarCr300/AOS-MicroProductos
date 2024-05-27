import { DeleteResult, UpdateResult } from 'typeorm';

export interface IRepository<T, TFilterDto, TCreateDto, TUpdateDto> {
  create(createDto: TCreateDto): Promise<T>;
  findAll(filter: TFilterDto): Promise<T[]>;
  findOne(filter: TFilterDto): Promise<T | undefined>;
  update(id: number, updateDto: TUpdateDto): Promise<UpdateResult>;
  remove(id: number): Promise<DeleteResult>;
}
