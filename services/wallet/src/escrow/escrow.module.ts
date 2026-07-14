import { Module } from '@nestjs/common';
import { EscrowInternalController } from './escrow.controller.js';
import { EscrowResolveService } from './escrow-resolve.service.js';
import { WalletsModule } from '../wallets/wallets.module.js';
import { SignerModule } from '../signer/signer.module.js';

@Module({
  imports: [WalletsModule, SignerModule],
  controllers: [EscrowInternalController],
  providers: [EscrowResolveService],
  exports: [EscrowResolveService],
})
export class EscrowModule {}
