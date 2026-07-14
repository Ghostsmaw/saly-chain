import { Inject, Injectable, Logger } from '@nestjs/common';
import { ExternalError } from '@salychain/errors';
import { ADMIN_ENV, type AdminEnv } from '../config/env.js';

export type MailDelivery = 'resend' | 'console';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(@Inject(ADMIN_ENV) private readonly env: AdminEnv) {}

  async sendAdminInvite(input: {
    to: string;
    name: string;
    role: string;
    tempPassword: string;
  }): Promise<{ delivery: MailDelivery; message: string }> {
    const loginUrl = `${this.env.ADMIN_CONSOLE_URL.replace(/\/$/, '')}/login`;
    const subject = 'You have been invited to SalyChain Super Admin';
    const text = [
      `Hi ${input.name},`,
      '',
      `You have been invited as ${input.role} on the SalyChain super-admin console.`,
      '',
      `Sign in: ${loginUrl}`,
      `Email: ${input.to}`,
      `Temporary password: ${input.tempPassword}`,
      '',
      'Use this password on first sign-in, then change it from your account settings.',
    ].join('\n');
    const html = `
      <p>Hi ${escapeHtml(input.name)},</p>
      <p>You have been invited as <strong>${escapeHtml(input.role)}</strong> on the SalyChain super-admin console.</p>
      <p><a href="${loginUrl}">Sign in to the admin console</a></p>
      <p><strong>Email:</strong> ${escapeHtml(input.to)}<br/>
      <strong>Temporary password:</strong> <code>${escapeHtml(input.tempPassword)}</code></p>
      <p>Use this password on first sign-in, then change it from your account settings.</p>
    `.trim();

    if (!this.env.RESEND_API_KEY) {
      this.logger.warn(
        `[dev mail] Super-admin invite for ${input.to}\nLogin: ${loginUrl}\nTemporary password: ${input.tempPassword}`,
      );
      return {
        delivery: 'console',
        message: `No RESEND_API_KEY configured — invite credentials logged to the admin service console for ${input.to}.`,
      };
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: this.env.RESEND_FROM_EMAIL,
        to: [input.to],
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw ExternalError(
        'admin.mail.send_failed',
        `Failed to send invite email (${response.status})`,
        { details: { body: body.slice(0, 500) } },
      );
    }

    return {
      delivery: 'resend',
      message: `Invite email sent to ${input.to}.`,
    };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
