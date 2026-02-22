import { ContactMessage } from '@/src/domain/entities/ContactMessage';
import { IContactRepository } from '@/src/domain/repositories/IContactRepository';

export class CreateContact {
    constructor(private readonly contactRepository: IContactRepository) { }

    async execute(data: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> {
        if (!data.name || !data.email || !data.description) {
            throw new Error('Todos los campos son obligatorios');
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error('Correo electrónico no válido');
        }

        return await this.contactRepository.create(data);
    }
}
