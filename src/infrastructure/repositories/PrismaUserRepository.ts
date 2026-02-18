import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { Role } from '../../domain/enums/Role';

export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findById(id: string): Promise<User | null> {
        const record = await this.prisma.user.findUnique({ where: { id } });
        if (!record) return null;
        return this.toDomain(record);
    }

    async findByEmail(email: string): Promise<User | null> {
        const record = await this.prisma.user.findUnique({ where: { email } });
        if (!record) return null;
        return this.toDomain(record);
    }

    async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const record = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash: data.passwordHash,
                role: data.role,
            },
        });
        return this.toDomain(record);
    }

    async update(id: string, data: Partial<Pick<User, 'name' | 'role'>>): Promise<User> {
        const record = await this.prisma.user.update({
            where: { id },
            data,
        });
        return this.toDomain(record);
    }

    private toDomain(record: {
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }): User {
        return new User(
            record.id,
            record.name,
            record.email,
            record.passwordHash,
            record.role as Role,
            record.createdAt,
            record.updatedAt,
        );
    }
}
