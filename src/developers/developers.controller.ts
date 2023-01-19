import { Controller, Post, Get, Body } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';

@Controller('developers')
export class DevelopersController {
  constructor(private developersService: DevelopersService) {}

  @Post('')
  createDeveloper(@Body() dto: CreateDeveloperDto) {
    return this.developersService.create(dto);
  }

  @Get('')
  getAllDevelopers() {
    return this.developersService.getAll();
  }
}
