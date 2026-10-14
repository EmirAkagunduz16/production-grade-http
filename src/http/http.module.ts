import { DynamicModule, Module } from '@nestjs/common';
import { HTTP_OPTIONS, HttpModuleOptions } from './http.types.js';
import { HttpService } from './http.service.js';
import {
  IDEMPOTENCY_STORE,
  InMemoryIdempotencyStore,
} from './idempotency-store.js';
import { ServerIdempotencyInterceptor } from './server-idempotency.interceptor.js';

@Module({})
export class HttpModule {
  static forRoot(options: HttpModuleOptions = {}): DynamicModule {
    const { ...moduleOptions } = options;

    return {
      module: HttpModule,
      global: true,
      providers: [
        ServerIdempotencyInterceptor,
        HttpService,
        {
          provide: HTTP_OPTIONS,
          useValue: moduleOptions,
        },
        {
          provide: IDEMPOTENCY_STORE,
          useClass: InMemoryIdempotencyStore,
        },
      ],
      exports: [HttpService, IDEMPOTENCY_STORE],
    };
  }
}
