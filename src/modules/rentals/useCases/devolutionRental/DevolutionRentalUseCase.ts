import { inject } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/Infra/TypeORM/Entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/Providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string;
}

class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("DayJSDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const minimum_daily = 1;
        const car = await this.carsRepository.findById(id);

        if (!rental) {
            throw new AppError("Rental does not exists! ");
        }

        // Veririca se a entrga é menor que 24h;
        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );

        // Se a diaria for menor que 24h, cobra-se a diaria minima, que é 1 dia.
        if (daily <= 0) {
            daily = minimum_daily;
        }

        // Verifica se houve atraso na entrega e informa o total de dias para calculo da multa.
        const delay = this.dateProvider.compareInDays(
            this.dateProvider.dateNow(),
            rental.expected_return_date
        );

        let total = 0;

        // Calcula a multa baseado em quantos dias teve de atraso.
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        // Calculando o total do aluguel
        total += daily * car.daily_rate;

        // Atualizando as informações para commitar;
        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        // Commit das informações
        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
