import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Access level' })
  readonly value: string;
  @ApiProperty({ example: 'Admin access', description: 'Role description' })
  readonly description: string;
}
