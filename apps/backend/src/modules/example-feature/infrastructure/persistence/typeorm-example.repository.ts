/**
 * TypeORM Repository Implementation
 * Implements the domain repository port using TypeORM
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExampleRepository } from '../../domain/ports/example.repository.port';
import { ExampleEntity as DomainEntity } from '../../domain/entities/example.entity';
import { ExampleEntity as OrmEntity } from './example.entity.orm';

@Injectable()
export class TypeOrmExampleRepository implements IExampleRepository {
  constructor(
    @InjectRepository(OrmEntity)
    private readonly ormRepository: Repository<OrmEntity>,
  ) {}

  async findById(id: string): Promise<DomainEntity | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    if (!ormEntity) {
      return null;
    }
    return this.toDomain(ormEntity);
  }

  async save(entity: DomainEntity): Promise<DomainEntity> {
    const ormEntity = this.toOrm(entity);
    const saved = await this.ormRepository.save(ormEntity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findAll(): Promise<DomainEntity[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map((ormEntity) => this.toDomain(ormEntity));
  }

  // Mapper: ORM to Domain
  private toDomain(ormEntity: OrmEntity): DomainEntity {
    return new DomainEntity(ormEntity.id, ormEntity.name, ormEntity.createdAt);
  }

  // Mapper: Domain to ORM
  private toOrm(domainEntity: DomainEntity): OrmEntity {
    const ormEntity = new OrmEntity();
    ormEntity.id = domainEntity.getId();
    ormEntity.name = domainEntity.getName();
    ormEntity.createdAt = domainEntity.getCreatedAt();
    return ormEntity;
  }
}
