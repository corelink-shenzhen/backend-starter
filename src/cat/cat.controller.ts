/*
 * @Author: Yu Chen
 * @Date: 2018-11-02 10:33:01
 * @Last Modified by: Yu Chen
 * @Last Modified time: 2018-11-02 13:31:13
 */

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  list,
  parseFunctions,
  FUNCTION_NAME,
  generateListOptions,
  generatePaginate,
  responseList,
  CORELINK_KEY_LIST_OPTIONS,
  CORELINK_KEY_PAGINATE,
} from '@corelink/db';
import {
  ApiUseTags,
  ApiCreatedResponse,
  ApiImplicitHeaders,
  ApiOkResponse,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { Cat } from './cat';
import { CatParams } from './cat.params';

@ApiUseTags('Cat')
@Controller('cats')
export class CatController {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
  ) {}

  @Get()
  @ApiImplicitHeaders([
    {
      name: CORELINK_KEY_LIST_OPTIONS,
      required: false,
    },
    {
      name: CORELINK_KEY_PAGINATE,
      required: false,
    },
  ])
  @ApiOkResponse({ description: 'OK' })
  async index(@Res() res: Response, @Req() req: Request) {
    const listOptions = generateListOptions(req);
    const paginate = generatePaginate(req);
    const result = await list(
      this.catRepository,
      parseFunctions(listOptions, FUNCTION_NAME.IsNull),
      paginate,
    );
    responseList(HttpStatus.OK, res, result);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Created' })
  async create(@Body() body: Cat) {
    const cat = await this.catRepository.create(body);
    const errors = await validate(cat);
    if (errors.length) throw new UnprocessableEntityException(errors);
    await this.catRepository.save(cat);
    return cat;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'OK' })
  async show(@Param() params: CatParams) {
    return this.catRepository.findOne({ id: params.id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Updated' })
  async update(@Param() params: CatParams, @Body() body: Cat) {
    const oldCat = await this.catRepository.findOne({ id: params.id });
    if (!oldCat) throw new NotFoundException();
    const cat = this.catRepository.create(body);
    cat.id = params.id;
    const errors = await validate(cat);
    if (errors.length) throw new UnprocessableEntityException(errors);
    return this.catRepository.save(cat);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Updated' })
  async updatePartially(@Param() params: CatParams, @Body() body: Cat) {
    const oldCat = await this.catRepository.findOne({ id: params.id });
    if (!oldCat) throw new NotFoundException();
    const cat = this.catRepository.merge(oldCat, body);
    const errors = await validate(cat);
    if (errors.length) throw new UnprocessableEntityException(errors);
    return this.catRepository.save(cat);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'Updated' })
  async remove(@Param() params: CatParams) {
    await this.catRepository.delete({ id: params.id });
  }
}
