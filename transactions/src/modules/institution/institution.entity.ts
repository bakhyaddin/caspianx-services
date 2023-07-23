import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  Index
} from 'typeorm';
import { BaseEntity } from '../../database/base-entity';
import { BankAccount } from '../bank-account/bank-account.entity';
import { Address } from '../address/address.entity';

/**
 * The institution entity
 *
 * @class Institution
 * @extends {BaseEntity}
 */
@Entity('institutions')
export class Institution extends BaseEntity {
  @Index()
  @Column({ nullable: false })
  realmName!: string;

  @Index()
  @Column({ nullable: false })
  name!: string;

  @OneToOne(() => Address, address => address.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  address!: Address;

  @Column({ nullable: false })
  code!: string;

  @Column({ nullable: false })
  taxId!: string;

  @OneToMany(() => BankAccount, bankAccount => bankAccount.id, {
    onDelete: 'CASCADE'
  })
  bankAccounts!: Array<BankAccount>;
}
