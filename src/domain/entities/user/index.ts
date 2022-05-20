import { Exclude } from 'class-transformer';
import { IsEmail, IsLowercase, IsString, MinLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  readonly id?: number;

  @Column({ unique: true, nullable: false, type: String })
  @IsString()
  @MinLength(4)
  @IsLowercase()
  uid: string;

  @Column({ nullable: false, type: String })
  @IsString()
  name: string;

  @Column({ unique: true, nullable: false, type: String })
  @IsEmail()
  email: string;

  @Column({ nullable: false, type: String })
  @IsString()
  @MinLength(8)
  password: string;

  @Column({ default: false, nullable: true, type: Boolean })
  published?: boolean;

  @Index('createdAt-idx')
  @CreateDateColumn({ nullable: true, type: Date })
  readonly createdAt?: string;

  @UpdateDateColumn({ nullable: true, type: Date })
  readonly updatedAt?: string;
}
