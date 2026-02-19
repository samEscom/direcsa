import { User } from '@/src/domain/entities/User';

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export function toUserDTO(user: User): UserDTO {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
    };
}
