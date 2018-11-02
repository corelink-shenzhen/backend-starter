/*
 * @Author: Yu Chen 
 * @Date: 2018-11-02 09:16:07 
 * @Last Modified by: Yu Chen
 * @Last Modified time: 2018-11-02 09:41:51
 */

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const path = 'api';
const version = '1.0';
const title = 'Corelink API example';
const description = 'Corelink backend starter';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(path, app, document);
}
