import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../database/base-entity';

/**
 * The Address entity
 *
 * @class Address
 * @extends {BaseEntity}
 */
@Entity('addresses')
export class Address extends BaseEntity {
  @Column({ nullable: false })
  city!: string;

  @Column({ nullable: false })
  district!: string;

  @Column({ nullable: false })
  street!: string;

  @Column({ nullable: true })
  building?: string;

  @Column({ name: 'building_number', nullable: true })
  buildingNumber?: string;

  @Column({ name: 'apartment_number', nullable: true })
  apartmentNumber?: string;
}
