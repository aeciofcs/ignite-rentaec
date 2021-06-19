import { ICreateCarDTO } from "@modules/cars/DTOs/ICreateCarDTO";
import { Car } from "@modules/cars/Infra/TypeORM/Entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<void> {
        const car = new Car();
        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });
        this.cars.push(car);
    }
}

export { CarsRepositoryInMemory };
