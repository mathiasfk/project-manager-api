import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { GatewaysModule } from './gateways/gateways.module';
import { AuthGuardService } from './gateways/guards/auth-guard/auth-guard.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [DomainModule, InfrastructureModule, GatewaysModule],
  controllers: [AppController],
  providers: [
    AppService, {
      provide: APP_GUARD,
      useClass: AuthGuardService,
    }],
})
export class AppModule { }
