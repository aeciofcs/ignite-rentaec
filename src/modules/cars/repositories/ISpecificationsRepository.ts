import { Specification } from "@modules/cars/Infra/TypeORM/Entities/Specification";

// DTO => Data Transfer Object
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
    list(): Promise<Specification[]>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
