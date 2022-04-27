import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { CreateParameter } from './parameters/create.parameter';
import { FindParameter } from './parameters/find.parameter';
import { UpdateParameter } from './parameters/update.parameter';
import { DeleteResponse } from './responses/delete.response';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public async create(@Body() data: CreateParameter): Promise<Task> {
    return this.taskService.create(data);
  }

  @Get()
  public async findAll(
    @Query('relations') relations: string,
    @Query() filter: FindParameter = {},
  ): Promise<Task[]> {
    return this.taskService.findAll(filter, relations?.split(','));
  }

  @Get(':id')
  public async findOneByID(
    @Param('id') id: string,
    @Query('relations') relations: string,
  ): Promise<Task | null> {
    return this.taskService.findOneById(+id, relations?.split(','));
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: UpdateParameter,
  ): Promise<Task> {
    return this.taskService.update(+id, data);
  }

  @Delete(':id')
  public async removeById(@Param('id') id: string): Promise<DeleteResponse> {
    return this.taskService.remove(+id);
  }
}
