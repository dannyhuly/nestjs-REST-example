import { ApiProperty } from '@nestjs/swagger';
import { IPagingRequest } from '../../models/IPagingRequest';

export class PagingRequestDto implements IPagingRequest {
  @ApiProperty({default: 1, type: Number, minimum: 1})
  page: number;
  @ApiProperty({default: 20, type: Number, minimum: 1})
  pageSize: number;
}
