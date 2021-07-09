import { inject } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/Repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/Providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists!!");
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token: token,
            expires_date,
        });
    }
}

export { SendForgotPasswordMailUseCase };
