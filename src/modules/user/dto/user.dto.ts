import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Use Min 8 characters, at least one letter, one number and one special character',
  })
  password: string;
}
