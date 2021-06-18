import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/Entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute(): Promise<Specification[]> {
        const specifications = await this.specificationsRepository.list();

        return specifications;
    }
}

export { ListSpecificationUseCase };
