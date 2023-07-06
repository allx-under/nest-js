import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const possUser = await this.userService.getUserByEmail(userDto.email);

    if (possUser) {
      throw new HttpException(
        'User is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPass = await bcrypt.hash(userDto.password, 5);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPass,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(user: CreateUserDto) {
    const possUser = await this.userService.getUserByEmail(user.email);

    if (!possUser) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }
    const validatePass = await bcrypt.compare(user.password, possUser.password);

    if (!validatePass) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }

    return possUser;
  }
}
