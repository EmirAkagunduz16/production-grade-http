import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HttpModule } from './http/http.module.js';
import { DemoController } from './demo/demo.controller.js';
import { UpstreamController } from './demo/upstream.controller.js';

@Module({
  imports: [
    HttpModule.forRoot({
      baseUrl: 'http://localhost:3000',
      timeoutMs: 3_000,
      keepAlive: {
        keepAliveMsecs: 30_000,
        maxSockets: 128,
        maxFreeSockets: 32,
      },
      idempotency: {
        enabled: true,
        methods: ['post', 'patch'],
      },
      circuitBreaker: {
        timeoutMs: 20_000,
      },
      retry: {
        retries: 0,
      },
    }),
  ],
  controllers: [AppController, DemoController, UpstreamController],
  providers: [AppService],
})
export class AppModule {}
