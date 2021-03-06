import { getRepository, Repository } from "typeorm";

import { Category } from "@modules/cars/Infra/TypeORM/Entities/category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    // private categories: Category[];

    private repository: Repository<Category>;

    // private static INSTANCE: CategoriesRepository;

    // private constructor() {
    constructor() {
        // this.categories = [];
        this.repository = getRepository(Category);
    }

    /*
    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
    } */

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
        /*
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category); 
        */
    }

    async list(): Promise<Category[]> {
        // return this.categories;
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        /*
        const category = this.categories.find(
            (category) => category.name === name
        ); */
        const category = await this.repository.findOne({ name });

        return category;
    }
}

export { CategoriesRepository };
