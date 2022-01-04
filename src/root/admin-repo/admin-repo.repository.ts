import { EntityRepository, Repository } from "typeorm";
import { AdminRepoEntity } from "./admin-repo.entity";






@EntityRepository(AdminRepoEntity)
export class AdminRepo extends Repository<AdminRepoEntity>{  
}