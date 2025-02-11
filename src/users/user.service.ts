import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async create(username: string, email: string, password: string): Promise<User> {
    const newUser = this.userRepository.create({ username, email, password });
    return await this.userRepository.save(newUser);
  }

  async delete(userId: number) {
    
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
    }

    await this.userRepository.remove(user);
    return { message: `User ${userId} deleted successfully` };  
  }
  
}

