/*
 * @Author: Yu Chen 
 * @Date: 2018-11-02 13:16:05 
 * @Last Modified by:   Yu Chen 
 * @Last Modified time: 2018-11-02 13:16:05 
 */

import { Column } from 'typeorm';
import { IsString, IsEnum, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export const colorEnum = ['white', 'black', 'others'];

export class Cat {
  @Column()
  @IsString()
  @ApiModelProperty()
  name: string;

  @Column()
  @IsString()
  @IsEnum(colorEnum)
  @ApiModelProperty({ enum: colorEnum })
  color: string;

  @Column()
  @ApiModelProperty()
  @IsBoolean()
  fishlike: boolean;
}
