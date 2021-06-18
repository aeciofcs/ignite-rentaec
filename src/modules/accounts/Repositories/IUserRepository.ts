import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";
import { User } from "../Infra/TypeORM/Entities/User";

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(user_id: string): Promise<User>;
}

export { IUserRepository };
