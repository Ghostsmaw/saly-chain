'use server';

import { revalidatePath } from 'next/cache';
import { ulid } from 'ulid';
import { Money, type CurrencyCode } from '@salychain/money';
import { submitPayrollIntent } from '@/lib/api';
import { requireSession } from '@/lib/auth';

interface PayrollRowPayload {
  id: string;
  name: string;
  amount: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
}

export async function runPayroll(formData: FormData) {
  await requireSession();
  const raw = String(formData.get('payroll_json') ?? '');
  let payload: {
    rows: PayrollRowPayload[];
    runName: string;
    payPeriod: string;
    currency: string;
  };

  try {
    payload = JSON.parse(raw) as typeof payload;
  } catch {
    return { ok: false, message: 'Invalid payroll payload.' };
  }

  if (!payload.rows?.length) {
    return { ok: false, message: 'Add at least one employee.' };
  }

  const currency = (payload.currency || 'NGN') as CurrencyCode;
  const lines: Array<{
    lineId: string;
    label: string;
    amountMinor: string;
    currency: string;
    bankCountry: string;
    bankCode: string;
    bankAccount: string;
    accountName?: string;
  }> = [];

  for (const row of payload.rows) {
    if (!row.name?.trim() || !row.amount?.trim()) {
      return { ok: false, message: 'Every employee needs a name and amount.' };
    }
    try {
      const amountMinor = Money.ofMajor(row.amount.trim(), currency).amountMinor.toString();
      lines.push({
        lineId: row.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 64) || `line-${ulid().slice(0, 8)}`,
        label: row.name.trim(),
        amountMinor,
        currency,
        bankCountry: 'NG',
        bankCode: row.bankCode.trim(),
        bankAccount: row.accountNumber.trim(),
        accountName: row.accountName?.trim() || row.name.trim(),
      });
    } catch (err) {
      return {
        ok: false,
        message: err instanceof Error ? err.message : `Invalid amount for ${row.name}`,
      };
    }
  }

  const idempotencyKey = `biz-payroll-${ulid()}`;

  try {
    const result = await submitPayrollIntent({
      idempotencyKey,
      name: payload.runName || 'Payroll run',
      payPeriod: payload.payPeriod,
      currency,
      lines,
    });

    revalidatePath('/payroll');
    revalidatePath('/transactions');
    revalidatePath('/');

    if (result.rejection) {
      return {
        ok: false,
        message: result.rejection.message,
        intentId: result.intent_id,
      };
    }

    return {
      ok: true,
      message: `Payroll batch submitted (${result.state}). ${lines.length} employees queued for execution.`,
      intentId: result.intent_id,
      batchId: result.execution_transaction_id,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Payroll submission failed.',
    };
  }
}
