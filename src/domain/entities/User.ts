import { Role } from '../enums/Role';

export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly role: Role,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static validate(name: string, email: string, password: string): void {
        if (!name || name.trim().length < 2) {
            throw new Error('El nombre debe tener al menos 2 caracteres');
        }
        if (!email || !email.includes('@')) {
            throw new Error('El email no es válido');
        }
        if (!password || password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
    }

    isAdmin(): boolean {
        return this.role === Role.ADMIN;
    }
}
