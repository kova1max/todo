import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

import { CreateParameter } from './parameters/create.parameter';
import { FindParameter } from './parameters/find.parameter';
import { UpdateParameter } from './parameters/update.parameter';
import { DeleteResponse } from './responses/delete.response';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  public async create(data: CreateParameter): Promise<Task> {
    const task = new Task();

    task.name = data.name;

    try {
      return this.taskRepository.save(task);
    } catch (e) {
      throw new HttpException(
        'Task create unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(
    filter: FindParameter = {},
    relations: string[] = [],
  ): Promise<Task[]> {
    try {
      return this.taskRepository.find({ where: filter, relations });
    } catch (e) {
      throw new HttpException(
        'Tasks find unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findOneById(
    id: number,
    relations: string[] = [],
  ): Promise<Task> {
    try {
      return this.taskRepository.findOne({
        where: { id },
        relations,
      });
    } catch (e) {
      throw new HttpException(
        'Task find unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async update(id: number, data: UpdateParameter): Promise<Task> {
    try {
      return this.taskRepository.save({ id, ...data });
    } catch (e) {
      throw new HttpException(
        'Task update unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async remove(id: number): Promise<DeleteResponse> {
    try {
      return {
        isTaskDeleted:
          (await this.taskRepository.delete({ id })).affected === 1,
      };
    } catch (e) {
      throw new HttpException(
        'Task remove unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
