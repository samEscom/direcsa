import { ContactMessage } from '../entities/ContactMessage';

export interface IContactRepository {
    create(data: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage>;
}
