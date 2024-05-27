import { HttpException, HttpStatus } from '@nestjs/common';
import {
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  Not,
  ObjectLiteral,
} from 'typeorm';

import { RepositoryBase } from './repository.base';
import { EntityBase } from './entity.base';

interface IServiceBase<
  TEntity,
  TResponseFindOne,
  TResponseFindAll,
  TCreateDto,
> {
  article: string;
  resourceName: string;
  requiresValidationInUpdate?: boolean;
  requiresValidationInCreation?: boolean;
  adapterFindAll: (e: TEntity) => TResponseFindAll;
  adapterFindOne: (e: TEntity) => TResponseFindOne;
  functionToCreateObjectToFindIfTheEntityAlreadyExists?: (
    dto: TCreateDto | TResponseFindOne,
  ) => any;
}

export class ServiceBase<
  T extends EntityTarget<ObjectLiteral & EntityBase>,
  TEntity extends ObjectLiteral & EntityBase,
  TResponseFindAll,
  TResponseFindOne,
  TFilterDto,
  TCreateDto,
  TUpdateDto,
> {
  private _requiresValidationInCreation: boolean;
  private _requiresValidationInUpdate: boolean;
  private _article: string;
  private _resourceName: string;
  protected _functionToCreateObjectToFindIfTheEntityAlreadyExists: (
    dto: TCreateDto | TResponseFindOne,
  ) => any;
  protected _adapterFindAll: (e: TEntity) => TResponseFindAll;
  protected _adapterFindOne: (e: TEntity) => TResponseFindOne;

  constructor(
    protected _repository: RepositoryBase<
      T,
      TEntity,
      TFilterDto,
      TCreateDto,
      TUpdateDto
    >,
    {
      requiresValidationInUpdate = true,
      requiresValidationInCreation = true,
      article,
      resourceName,
      functionToCreateObjectToFindIfTheEntityAlreadyExists = () => {},
      adapterFindAll,
      adapterFindOne,
    }: IServiceBase<TEntity, TResponseFindOne, TResponseFindAll, TCreateDto>,
  ) {
    this._requiresValidationInCreation = requiresValidationInCreation;
    this._requiresValidationInUpdate = requiresValidationInUpdate;
    this._article = article;
    this._resourceName = resourceName;
    this._functionToCreateObjectToFindIfTheEntityAlreadyExists =
      functionToCreateObjectToFindIfTheEntityAlreadyExists;
    this._adapterFindAll = adapterFindAll;
    this._adapterFindOne = adapterFindOne;
  }

  async findOne(
    filter: TFilterDto,
    options: FindOneOptions<ObjectLiteral> = {},
  ): Promise<TResponseFindOne> {
    const response = await this._repository.findOne({ ...filter }, options);
    if (response == null)
      throw new HttpException(
        `No se ha encontrado ${this._article} ${this._resourceName}`,
        HttpStatus.NOT_FOUND,
      );
    return this._adapterFindOne(response);
  }

  async findAll(
    dto?: TFilterDto,
    options: FindManyOptions<ObjectLiteral> = {},
  ): Promise<TResponseFindAll[]> {
    const entities = await this._repository.findAll({ ...dto }, options);
    return entities.map((e) => this._adapterFindAll(e));
  }

  async create(dto: TCreateDto) {
    if (this._requiresValidationInCreation) {
      const filterToKnowIfAlreadyExists =
        this._functionToCreateObjectToFindIfTheEntityAlreadyExists({
          ...dto,
        });
      const entityFounded = await this._repository.findOne(
        filterToKnowIfAlreadyExists,
      );
      if (entityFounded != null)
        throw new HttpException(
          `${this._article} ${this._resourceName} ya existe`,
          HttpStatus.CONFLICT,
        );
    }

    const entityCreated = await this._repository.create(dto);
    return entityCreated;
  }

  async update(id: number, dto: TUpdateDto) {
    if (Object.keys(dto).length == 0)
      throw new HttpException(
        `No se estan registrando cambios en ${this._article} ${this._resourceName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const entity = await this.findOne({ id } as any);
    if (this._requiresValidationInUpdate) {
      const valuesToFilter =
        this._functionToCreateObjectToFindIfTheEntityAlreadyExists({
          ...entity,
          ...dto,
        });
      const entityFounded = await this._repository.findOne({
        ...valuesToFilter,
        id: Not(id),
      });
      if (entityFounded != null)
        throw new HttpException(
          `Ya existe un ${this._resourceName} con estos datos`,
          HttpStatus.CONFLICT,
        );
    }

    const result = await this._repository.update(id, dto);
    if (result.affected == 0)
      throw new HttpException(
        `Hubo un problema al actualizar ${this._article} ${this._resourceName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return null;
  }

  async remove(id: number) {
    await this.findOne({ id } as any);

    const result = await this._repository.remove(id);
    if (result.affected == 0)
      throw new HttpException(
        `Hubo un problema de eliminar ${this._article} ${this._resourceName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return null;
  }

  async removeWithChildren(id: number, relations: any) {
    const entity = await this._repository.findOne({ id } as any, {
      relations,
    });

    if (!entity) {
      throw new HttpException(
        `No se ha encontrado ${this._article} ${this._resourceName}`,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this._repository.removeWithEntity(entity);

      return null;
    } catch (error) {
      throw new HttpException(
        `Hubo un problema de eliminar ${this._article} ${this._resourceName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
