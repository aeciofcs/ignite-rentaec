import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/Infra/TypeORM/Repositories/UsersRepository";
import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";
import { CarsRepository } from "@modules/cars/Infra/TypeORM/Repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/Infra/TypeORM/Repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/Infra/TypeORM/Repositories/SpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUserRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
