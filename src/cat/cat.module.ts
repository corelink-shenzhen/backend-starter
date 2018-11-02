/*
 * @Author: Yu Chen 
 * @Date: 2018-11-02 13:45:46 
 * @Last Modified by:   Yu Chen 
 * @Last Modified time: 2018-11-02 13:45:46 
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatEntity } from './cat.entity';

@Module({
  controllers: [CatController],
  providers: [CatService],
  imports: [TypeOrmModule.forFeature([CatEntity])],
})
export class CatModule {}
