import { ApiProperty } from '@nestjs/swagger';

export class UpdateParameter {
  @ApiProperty({ type: 'string', example: 'Take a lunch', required: false })
  public readonly name?: string;
}
