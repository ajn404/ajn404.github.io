// src/people.module.ts
import { Module } from '@nestjs/common';
import { PeopleGateway } from './people.gateway';

@Module({
  providers: [PeopleGateway],
})
export class PeopleModule {}
