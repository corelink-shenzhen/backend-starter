import { Module } from '@nestjs/common';
import { db } from './db';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [db, CatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
