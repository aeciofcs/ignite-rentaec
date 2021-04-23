import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";
import { User } from "../Entities/User";

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
}

export { IUserRepository };
