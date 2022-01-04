import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin-repo.controller';
import { AdminRepo } from './admin-repo.repository';
import { AdminRepoService } from './admin-repo.service';

@Module({
  imports:[TypeOrmModule.forFeature([AdminRepo],"market")],
  controllers: [AdminController],
  providers: [AdminRepoService],
  exports:[AdminRepoService]
})
export class AdminRepoModule {}
