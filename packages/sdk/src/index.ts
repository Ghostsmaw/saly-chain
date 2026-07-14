import { HttpTransport, type ClientOptions } from './transport.js';
import { Intents } from './resources/intents.js';
import { Transactions } from './resources/transactions.js';
import { Webhooks } from './resources/webhooks.js';
import { Agents } from './resources/agents.js';

export { SalyApiError, SalyNetworkError } from './errors.js';
export type { SalyApiErrorJson } from './errors.js';
export type {
  IntentRecord,
  IntentState,
  IntentSubmissionResult,
  Page,
  SubscriptionStatus,
  Transaction,
  TransactionState,
  WebhookEnvelope,
  WebhookSubscription,
  WebhookSubscriptionWithSecret,
} from './types.js';
export { verifyWebhookSignature, WebhookSignatureError } from './webhooks/verify.js';
export type { ClientOptions } from './transport.js';

/**
 * The official SalyChain client.
 *
 * @example
 *   const saly = new SalyChain({ apiKey: process.env.SALY_API_KEY! });
 *
 *   const { intent_id, execution_transaction_id } = await saly.intents.submit({
 *     intent_id: 'int_my_correlation_id',
 *     kind: 'transfer',
 *     actor: { type: 'user', id: 'user_42' },
 *     source: { type: 'wallet', wallet_id: 'wal_…' },
 *     destination: { type: 'address', chain: 'XRPL', address: 'rExampleXRPLDestinationAddr…' },
 *     amount: { value: '10000000', currency: 'XRP' },
 *   });
 *
 *   for await (const event of pollTransaction(saly, execution_transaction_id!)) {
 *     console.log(event.state);
 *     if (event.state === 'SETTLED') break;
 *   }
 */
export class SalyChain {
  readonly intents: Intents;
  readonly transactions: Transactions;
  readonly webhooks: Webhooks;
  readonly agents: Agents;

  constructor(options: ClientOptions) {
    const transport = new HttpTransport(options);
    this.intents = new Intents(transport);
    this.transactions = new Transactions(transport);
    this.webhooks = new Webhooks(transport);
    this.agents = new Agents(transport);
  }
}

export default SalyChain;
