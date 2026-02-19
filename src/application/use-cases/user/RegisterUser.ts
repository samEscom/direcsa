import { User } from '@/src/domain/entities/User';
import { IUserRepository } from '@/src/domain/repositories/IUserRepository';
import { Role } from '@/src/domain/enums/Role';

export interface RegisterUserDTO {
    name: string;
    email: string;
    password: string;
}

export interface RegisterUserResult {
    user: User;
}

export class RegisterUser {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly hashPassword: (plain: string) => Promise<string>,
    ) { }

    async execute(dto: RegisterUserDTO): Promise<RegisterUserResult> {
        // Validate domain rules
        User.validate(dto.name, dto.email, dto.password);

        // Check email uniqueness
        const existing = await this.userRepository.findByEmail(dto.email);
        if (existing) {
            throw new Error('Ya existe una cuenta con ese email');
        }

        // Hash password (infrastructure concern injected)
        const passwordHash = await this.hashPassword(dto.password);

        // Create user
        const user = await this.userRepository.create({
            name: dto.name.trim(),
            email: dto.email.toLowerCase().trim(),
            passwordHash,
            role: Role.BUYER,
        });

        return { user };
    }
}
