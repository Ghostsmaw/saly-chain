-- Add WEBSOCKET to the StreamSink enum (live dashboard fan-out sink).
ALTER TYPE "StreamSink" ADD VALUE IF NOT EXISTS 'WEBSOCKET';
