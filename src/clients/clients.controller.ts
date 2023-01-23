import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post('')
  createClient(@Body() clientDto: CreateClientDto) {
    return this.clientsService.create(clientDto);
  }

  @Get('')
  getAllClients() {
    return this.clientsService.getAll();
  }

  @Get('/:id')
  getByIdClient(@Param('id') id: number) {
    return this.clientsService.getOneById(id);
  }

  @Put('update/:id')
  updateByIdClient(@Param('id') id: number, @Body() typeDto: CreateClientDto) {
    return this.clientsService.updateOneById(id, typeDto);
  }

  @Delete('delete/:id')
  deleteByIdClient(@Param('id') id: number) {
    return this.clientsService.deleteOneById(id);
  }
}
