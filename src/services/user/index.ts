import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, CreateUserInput, UpdateUserInput } from '~/domain/models/user';
import { UserEntity } from '~/domain/entities/user';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async create(data: CreateUserInput) {
    data.password = await bcrypt.hash(data.password, 10);
    const user = this.userRepository.save(data).catch((e) => {
      if (e instanceof Error) throw new NotAcceptableException(e.message);
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async find(uniqueData: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: this.validateUniqueData(uniqueData) });
    if (!user) throw new NotFoundException('A user is not found');
    return user;
  }

  async update(uniqueData: string, updates: Partial<UpdateUserInput>): Promise<UpdateResult> {
    return this.userRepository.update(this.validateUniqueData(uniqueData), updates);
  }

  async delete(uniqueData: string): Promise<DeleteResult> {
    return this.userRepository.delete(this.validateUniqueData(uniqueData));
  }

  validateUniqueData(uniqueData: string): Partial<User> {
    return isEmail(uniqueData) ? { email: uniqueData } : { uid: uniqueData };
  }

  async clear() {
    return this.userRepository.clear();
  }
}
