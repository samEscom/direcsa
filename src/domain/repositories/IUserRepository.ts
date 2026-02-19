import { User } from '@/src/domain/entities/User';
import { Role } from '@/src/domain/enums/Role';

export interface CreateUserData {
    name: string;
    email: string;
    passwordHash: string;
    role: Role;
}

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: CreateUserData): Promise<User>;
    update(id: string, data: Partial<Pick<User, 'name' | 'role'>>): Promise<User>;
}
