import { ApiProperty } from '@nestjs/swagger';
import typeorm, { ObjectLiteral } from 'typeorm';

export class DeleteResult implements typeorm.DeleteResult {
  @ApiProperty({
    description: 'Number of affected rows/documents\nNot all drivers support this',
    readOnly: true,
    nullable: true,
    required: false,
    type: Number,
  })
  affected?: number | null;

  @ApiProperty({
    description: 'Raw SQL result returned by executed query.',
    readOnly: true,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export class UpdateResult implements typeorm.UpdateResult {
  @ApiProperty({
    description: 'Number of affected rows/documents\nNot all drivers support this',
    readOnly: true,
    required: false,
    type: Number,
  })
  affected?: number;

  @ApiProperty({
    description: 'Raw SQL result returned by executed query.',
    readOnly: true,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;

  @ApiProperty({
    description:
      'Generated values returned by a database.\nHas entity-like structure (not just column database name and values)',
    readOnly: true,
  })
  generatedMaps: ObjectLiteral[];
}
