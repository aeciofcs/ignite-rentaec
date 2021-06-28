import { Rental } from "@modules/rentals/Infra/TypeORM/Entities/Rental";

import { ICreateRentalDTO } from "../DTOs/ICreateRentalDTO";

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
