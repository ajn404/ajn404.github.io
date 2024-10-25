import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleGateway } from './people.gateway';

@Module({
  imports: [PeopleGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
