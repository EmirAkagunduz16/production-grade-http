import { AxiosRequestConfig, Method } from 'axios';
import { AgentOptions as HttpAgentOptions } from 'http';
import { AgentOptions as HttpsAgentOptions } from 'https';

export interface KeepAliveOptions {
  keepAlive?: boolean;
  keepAliveMsecs?: number;
  maxSockets?: number;
  maxFreeSockets?: number;
  http?: HttpAgentOptions;
  https?: HttpsAgentOptions;
}

export interface RetryOptions {
  retries?: number;
  minDelayMs?: number;
  maxDelayMs?: number;
  retryMethods?: Method[];
  retryStatusCode?: number[];
}

export interface HttpModuleOptions {
  baseUrl?: string;
  timeoutMs?: number;
  headers?: Record<string, string>;
  keepAlive?: KeepAliveOptions;
  retry?: RetryOptions;
  circuitBreaker?: CircuitBreakerOptions;
  idempotency?: IdempotencyOptions;
}

export interface CircuitBreakerOptions {
  timeoutMs?: number;
  errorThresholdPercentage?: number;
  resetTimeoutMs?: number;
  rollingCountTimeout?: number;
  rollingCountBuckets?: number;
  volumeThreshold?: number;
  name?: string;
}

export interface IdempotencyOptions {
  enabled?: boolean;
  headerName?: string;
  methods?: Method[];
}

export type RequestConfig = AxiosRequestConfig & {
  skipCircuitBreaker?: boolean;
};

export const HTTP_OPTIONS = Symbol('HTTP_OPTIONS');
