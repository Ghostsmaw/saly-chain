import { Inject, Injectable, Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, type Producer, Partitioners } from 'kafkajs';
import { ExternalError, ValidationError } from '@salychain/errors';
import { DATASTREAMS_ENV, type DatastreamsEnv } from '../config/env.js';

/**
 * Kafka / Redpanda sink for enterprise-volume push. Produces matched events
 * onto a per-stream topic. Disabled by default (`DATASTREAMS_KAFKA_ENABLED`):
 * the producer is only constructed and connected when enabled, so the service
 * boots cleanly in environments without a broker.
 *
 * Topics are validated against `DATASTREAMS_KAFKA_TOPIC_PREFIX` so a tenant can
 * never target an arbitrary internal topic.
 */
@Injectable()
export class KafkaSink implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(KafkaSink.name);
  private producer?: Producer;
  private ready = false;

  constructor(@Inject(DATASTREAMS_ENV) private readonly env: DatastreamsEnv) {}

  get enabled(): boolean {
    return this.env.DATASTREAMS_KAFKA_ENABLED;
  }

  async onModuleInit(): Promise<void> {
    if (!this.enabled) {
      this.logger.log('Kafka sink disabled (DATASTREAMS_KAFKA_ENABLED=false)');
      return;
    }
    const kafka = new Kafka({
      clientId: this.env.DATASTREAMS_KAFKA_CLIENT_ID,
      brokers: this.env.DATASTREAMS_KAFKA_BROKERS.split(',')
        .map((b) => b.trim())
        .filter(Boolean),
      retry: { retries: 5 },
    });
    this.producer = kafka.producer({
      allowAutoTopicCreation: false,
      createPartitioner: Partitioners.DefaultPartitioner,
    });
    await this.producer.connect();
    this.ready = true;
    this.logger.log(`Kafka sink connected to ${this.env.DATASTREAMS_KAFKA_BROKERS}`);
  }

  async onApplicationShutdown(): Promise<void> {
    if (this.producer) await this.producer.disconnect();
    this.ready = false;
  }

  /**
   * Validate (and normalize) a tenant-supplied topic at stream-create time.
   * Throws a domain error the API layer can surface as 400.
   */
  assertTopicAllowed(topic: string): void {
    if (!this.enabled) {
      throw ValidationError(
        'datastreams.kafka.disabled',
        'Kafka sink is not enabled on this deployment',
      );
    }
    const prefix = this.env.DATASTREAMS_KAFKA_TOPIC_PREFIX;
    if (prefix && !topic.startsWith(prefix)) {
      throw ValidationError(
        'datastreams.kafka.topic_prefix',
        `Kafka topic must start with "${prefix}"`,
      );
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(topic) || topic.length > 249) {
      throw ValidationError('datastreams.kafka.topic_invalid', 'Invalid Kafka topic name');
    }
  }

  /**
   * Produce one event to the stream's topic. The event_id is used as the message
   * key so a partition preserves per-entity ordering and consumers can dedupe.
   */
  async produce(topic: string, key: string, value: unknown): Promise<void> {
    if (!this.enabled || !this.producer || !this.ready) {
      throw ExternalError('datastreams.kafka.unavailable', 'Kafka sink is not available');
    }
    await this.producer.send({
      topic,
      messages: [{ key, value: JSON.stringify(value) }],
    });
  }
}
