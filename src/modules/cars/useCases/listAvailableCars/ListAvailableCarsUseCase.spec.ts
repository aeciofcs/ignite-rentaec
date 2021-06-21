import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Description Car1 Test",
            daily_rate: 480.0,
            license_plate: "AECD-1234",
            fine_amount: 250,
            brand: "Car1_brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Description Car2 Test",
            daily_rate: 480.0,
            license_plate: "AECD-2234",
            fine_amount: 250,
            brand: "Car_brand_test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Description Car3 Test",
            daily_rate: 480.0,
            license_plate: "AECE-3234",
            fine_amount: 250,
            brand: "Car3_brand_test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "Description Car4 Test",
            daily_rate: 480.0,
            license_plate: "AERD-2884",
            fine_amount: 250,
            brand: "Car4_brand_test",
            category_id: "123456",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "123456",
        });

        expect(cars).toEqual([car]);
    });
});
