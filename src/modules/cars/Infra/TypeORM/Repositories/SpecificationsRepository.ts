import { getRepository, Repository } from "typeorm";

import { Specification } from "@modules/cars/Infra/TypeORM/Entities/Specification";
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    // private specifications: Specification[];

    // private static INSTANCE: SpecificationsRepository;

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository("Specification");
    }

    /*
    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }
        return SpecificationsRepository.INSTANCE;
    } */

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        /*
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            create_at: new Date(),
        });

        this.specifications.push(specification); */
        const specification = this.repository.create({ name, description });

        await this.repository.save(specification);
        return specification;
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications;
    }
}

export { SpecificationsRepository };
