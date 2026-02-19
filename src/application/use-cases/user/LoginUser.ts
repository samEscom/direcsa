import { User } from '@/src/domain/entities/User';
import { IUserRepository } from '@/src/domain/repositories/IUserRepository';

export interface LoginUserDTO {
    email: string;
    password: string;
}

export interface LoginUserResult {
    user: User;
    token: string;
}

export class LoginUser {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly verifyPassword: (plain: string, hash: string) => Promise<boolean>,
        private readonly signToken: (payload: Record<string, unknown>) => string,
    ) { }

    async execute(dto: LoginUserDTO): Promise<LoginUserResult> {
        if (!dto.email || !dto.password) {
            throw new Error('Email y contraseña son requeridos');
        }

        const user = await this.userRepository.findByEmail(dto.email.toLowerCase().trim());
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isValid = await this.verifyPassword(dto.password, user.passwordHash);
        if (!isValid) {
            throw new Error('Credenciales inválidas');
        }

        const token = this.signToken({
            sub: user.id,
            email: user.email,
            role: user.role,
        });

        return { user, token };
    }
}
