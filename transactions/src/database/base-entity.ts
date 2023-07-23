// Base data object definition for all entities
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectId
} from 'typeorm';

export abstract class BaseEntity {
  // uuidv4 https://github.com/typeorm/typeorm/blob/master/src/util/RandomGenerator.ts#L149
  @PrimaryGeneratedColumn('uuid')
  id!: ObjectId;

  // This column will automatically created on creation time
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt!: Date;

  // This column will automatically be updated on modification
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false
  })
  updatedAt!: Date;
}
