import { Entity, Column, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../database/base-entity';
import { Institution } from '../institution/institution.entity';
import { BankAccount } from '../bank-account/bank-account.entity';

/**
 * The transaction entity
 *
 * @class Transaction
 * @extends {BaseEntity}
 */
@Entity('transactions')
export class Transaction extends BaseEntity {
  @Index()
  @Column({ nullable: false })
  realm!: string;

  @Index()
  @Column({ name: 'transaction_code', type: 'bigint', nullable: false })
  transactionCode!: number;

  @OneToOne(() => Institution, institution => institution.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  toInstitution!: Institution;

  @OneToOne(() => BankAccount, bankAccount => bankAccount.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  bankAccount!: BankAccount;

  @Column({ nullable: true })
  description?: string;
}
