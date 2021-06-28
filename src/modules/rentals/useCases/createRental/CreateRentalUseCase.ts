import { Rental } from "@modules/rentals/Infra/TypeORM/Entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(private rentalsRepository: IRentalsRepository) {}

    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );
        if (carUnavailable) {
            throw new AppError("Car is unavailable!");
        }
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
            user_id
        );
        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
