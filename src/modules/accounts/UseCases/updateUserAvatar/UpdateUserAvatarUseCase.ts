// Adicionar coluna avatar na tabela de users
//  => yarn typeorm migration:create -n AlterUserAddAvatar
// Refatorar usuário com coluna avatar
// Configuração upload multer
// Criar regra de negócio do upload
// Criar controller

import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../Repositories/IUserRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) {}

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };
