import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/base-entity';
import { Address } from '../address/address.entity';
import { Currency } from './types/currency.type';

/**
 * The institution entity
 *
 * @class BankAccount
 * @extends {BaseEntity}
 */
@Entity('bank_accounts')
export class BankAccount extends BaseEntity {
  @Column({ name: 'bank_name', nullable: false })
  bankName!: string;

  @OneToOne(() => Address, address => address.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  address!: string;

  @Column({ name: 'account_number', nullable: false })
  accountNumber!: string;

  @Column({ nullable: false, type: 'enum', enum: Currency })
  currency!: Currency;
}
