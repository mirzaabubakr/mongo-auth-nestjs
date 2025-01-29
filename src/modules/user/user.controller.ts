import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  RegisterUser(@Body() userDto: UserDTO) {
    return this.userService.createUser(userDto);
  }

  @Get()
  @UseGuards(PassportJwtAuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }
}
