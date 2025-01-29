import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entity/user.entity';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { compare, hash } from 'bcryptjs';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly loggerService: LoggerService,
  ) {}

  async getUsers() {
    return this.userModel.find({});
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findById(query: FilterQuery<User>) {
    const user = (await this.userModel.findOne(query)).toObject();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  
  async createUser(userDto: UserDTO) {
    this.loggerService.log('Creating a new user');
    const user = await this.findByEmail(userDto.email);
    if (user) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'User Already Exists',
      };
    }
    userDto.password = await hash(userDto.password, 10);
    const createdUser = new this.userModel(userDto);
    await createdUser.save();
    return { statusCode: HttpStatus.CREATED, message: 'User Registered' };
  }

  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.userModel.findOneAndUpdate(query, data);
  }
}
