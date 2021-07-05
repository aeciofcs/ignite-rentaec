import { ICreateCarDTO } from "../DTOs/ICreateCarDTO";
import { Car } from "../Infra/TypeORM/Entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findAvailable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
