import { RequestParamsDto, RequestWithUser, TaskRequest } from '@compito/api-interfaces';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PERMISSIONS } from '../core/config/permissions.config';
import { Permissions } from '../core/decorators/permissions.decorator';
import { Role } from '../core/decorators/roles.decorator';
import { PermissionsGuard } from '../core/guards/permissions.guard';
import { RolesGuard } from '../core/guards/roles.guard';
import { getUserDetails } from '../core/utils/payload.util';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(RolesGuard, PermissionsGuard)
  @Role('user')
  @Permissions(PERMISSIONS.task.create)
  @Post()
  create(@Body() task: TaskRequest, @Req() req: RequestWithUser) {
    return this.taskService.create(task, req.user);
  }

  @UseGuards(RolesGuard, PermissionsGuard)
  @Role('user')
  @Permissions(PERMISSIONS.task.read)
  @Get()
  findAll(@Query() query: RequestParamsDto) {
    return this.taskService.findAll(query);
  }
  @UseGuards(RolesGuard, PermissionsGuard)
  @Role('user')
  @Permissions(PERMISSIONS.task.read)
  @Get('my')
  findMyTasks(@Query() query: RequestParamsDto, @Req() req: RequestWithUser) {
    const { userId } = getUserDetails(req.user);
    const where: Prisma.TaskWhereInput = {
      assignees: {
        some: {
          id: userId,
        },
      },
    };
    return this.taskService.findAll(query, where);
  }

  @UseGuards(PermissionsGuard)
  @Permissions(PERMISSIONS.task.read)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @UseGuards(RolesGuard, PermissionsGuard)
  @Role('user')
  @Permissions(PERMISSIONS.task.update)
  @Patch(':id')
  update(@Param('id') id: string, @Body() task: TaskRequest) {
    return this.taskService.update(id, task);
  }

  @UseGuards(RolesGuard, PermissionsGuard)
  @Role('user')
  @Permissions(PERMISSIONS.task.delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
