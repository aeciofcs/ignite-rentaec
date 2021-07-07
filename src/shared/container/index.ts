import { container } from "tsyringe";

import "@shared/container/Providers";

import { UsersRepository } from "@modules/accounts/Infra/TypeORM/Repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/Infra/TypeORM/Repositories/UsersTokensRepository";
import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/Repositories/IUsersTokensRepository";
import { CarsImagesRepository } from "@modules/cars/Infra/TypeORM/Repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/Infra/TypeORM/Repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/Infra/TypeORM/Repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/Infra/TypeORM/Repositories/SpecificationsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rentals/Infra/TypeORM/Repository/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

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

container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);
