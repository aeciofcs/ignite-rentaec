import { UsersRepositoryInMemory } from "@modules/accounts/Repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/Repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJSDateProvider } from "@shared/container/Providers/DateProvider/Implementations/DayJSDateProvider";
import { MailProviderInMemory } from "@shared/container/Providers/MailProvider/In-Memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let dateProvider: DayJSDateProvider;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        mailProviderInMemory = new MailProviderInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

        dateProvider = new DayJSDateProvider();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProviderInMemory
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

        await usersRepositoryInMemory.create({
            name: "Aecio",
            email: "aecio@lojastalucia.com.br",
            driver_license: "123456789",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute(
            "aecio@lojastalucia.com.br"
        );

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("ae@lojastalucia.com.br")
        ).rejects.toEqual(new AppError("User does not exists!!"));
    });

    it("Should be able to create an users token", async () => {
        const tokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            name: "Aecio",
            email: "aecio@jsldistribuidora.com.br",
            driver_license: "123456789",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute(
            "aecio@jsldistribuidora.com.br"
        );

        expect(tokenMail).toHaveBeenCalled();
    });
});
