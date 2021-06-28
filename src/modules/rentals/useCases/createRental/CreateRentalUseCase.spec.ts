import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-Memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: new Date(),
        });
        // console.log(rental);
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to tha same USER", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "user",
                car_id: "121234",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: "user",
                car_id: "121212",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);

        // expect(rental).toHaveProperty("id");
        // expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to tha same CAR", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "car",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "car",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
