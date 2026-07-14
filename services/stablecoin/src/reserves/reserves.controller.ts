import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservesService } from './reserves.service.js';

class AttestationDto {
  reserve_account_id!: string;
  attestation_hash!: string;
  balance_minor!: string;
  authorized_ceiling_minor!: string;
  attestation_url?: string;
  as_of!: string;
}

@ApiTags('reserves')
@Controller('reserves')
export class ReservesController {
  constructor(private readonly reserves: ReservesService) {}

  @Get()
  list() {
    return this.reserves.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.reserves.getById(id);
  }

  @Post('attestations')
  attest(@Body() body: AttestationDto) {
    return this.reserves.recordAttestation(body);
  }
}
