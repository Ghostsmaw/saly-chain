import { Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { financeEnvSchema, FINANCE_ENV } from '../config/env.js';
import { FinanceController } from './finance.controller.js';
import { FinanceService } from './finance.service.js';

@Module({
  controllers: [FinanceController],
  providers: [
    FinanceService,
    { provide: FINANCE_ENV, useFactory: () => loadEnv(financeEnvSchema) },
  ],
})
export class FinanceModule {}
