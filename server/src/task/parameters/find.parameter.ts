import { ApiProperty } from '@nestjs/swagger';

export class FindParameter {
  @ApiProperty({ type: 'string', example: 'Take a lunch', required: false })
  public readonly name?: string;
}
