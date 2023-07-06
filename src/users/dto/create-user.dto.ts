import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @IsString({ message: 'Should be string' })
  @IsEmail({}, { message: 'Wrong email' })
  readonly email: string;

  @ApiProperty({ example: '1112233*', description: 'Password' })
  @IsString({ message: 'Should be string' })
  @Length(6, 18, { message: 'Minimum 6 and maximum 18 symbols' })
  readonly password: string;
}
