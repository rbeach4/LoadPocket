import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ example: 'BOL-12345.pdf' })
  name: string;

  @ApiProperty({ example: 'BOL' })
  type: string;

  @ApiProperty({ example: 'https://s3.amazonaws.com/bucket/bol-12345.pdf' })
  url: string;

  @ApiProperty({ example: 'cuid123' })
  loadId: string;
}
