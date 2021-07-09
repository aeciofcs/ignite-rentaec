import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/Repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/Providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/Providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayJSDateProvider")
        private dateProvider: IDateProvider,

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "Views",
            "Emails",
            "forgotPassword.hbs"
        );

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

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        };

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        );
    }
}

export { SendForgotPasswordMailUseCase };
