import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): { message: string; docs: string; health: string } {
    return {
      message: 'NestJS GitOps portfolio API is running',
      docs: '/api/v1/products',
      health: '/health',
    };
  }

  @Get('/health')
  getHealth(): { status: string; service: string; timestamp: string } {
    return this.appService.getHealth();
  }
}
