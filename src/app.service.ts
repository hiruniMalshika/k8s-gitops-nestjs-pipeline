import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHealth(): { status: string; service: string; timestamp: string } {
    return {
      status: 'ok',
      service: this.configService.get<string>('APP_NAME', 'nestjs-gitops-portfolio'),
      timestamp: new Date().toISOString(),
    };
  }
}
