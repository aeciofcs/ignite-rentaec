import { ICreateCarDTO } from "../DTOs/ICreateCarDTO";
import { Car } from "../Infra/TypeORM/Entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
