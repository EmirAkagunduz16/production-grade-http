import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { Idempotent } from '../http/idempotent.decorator.js';

@Controller('upstream')
export class UpstreamController {
  private orderCounter = 0;

  @Get('unstable')
  unstable(@Query('failRate') failRate = '0.6') {
    const rate = Number(failRate);
    if (Math.random() < rate) {
      throw new HttpException(
        'upstream is down',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return { ok: true, at: new Date().toISOString() };
  }

  @Idempotent()
  @Post('create-order')
  createOrder(@Body() body: unknown) {
    this.orderCounter += 1;

    return {
      orderId: `order-${this.orderCounter}`,
      receivedAt: new Date().toISOString(),
      body,
    };
  }
}
