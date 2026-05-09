import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { VmsModule } from './vms/vms.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule, 
    VmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
