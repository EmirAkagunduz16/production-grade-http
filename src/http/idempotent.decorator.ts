import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ServerIdempotencyInterceptor } from './server-idempotency.interceptor.js';

export const Idempotent = () =>
  applyDecorators(UseInterceptors(ServerIdempotencyInterceptor));
