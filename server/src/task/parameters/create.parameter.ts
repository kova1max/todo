import { ApiProperty } from '@nestjs/swagger';

export class CreateParameter {
  @ApiProperty({ type: 'string', example: 'Take a lunch' })
  public readonly name: string;

  @ApiProperty({ type: 'number', example: 1 })
  public readonly user: number;
}
