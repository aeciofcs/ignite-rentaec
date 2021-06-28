import { CarImage } from "@modules/cars/Infra/TypeORM/Entities/CarImage";

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository };
