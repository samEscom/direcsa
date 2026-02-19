import { Quote } from '@/src/domain/entities/Quote';

export interface CreateQuoteItemData {
    productId: string;
    quantity: number;
    unitPrice: number;
}

export interface CreateQuoteData {
    userId: string;
    notes?: string;
    items: CreateQuoteItemData[];
}

export interface IQuoteRepository {
    findAll(userId?: string): Promise<Quote[]>;
    findById(id: string): Promise<Quote | null>;
    create(data: CreateQuoteData): Promise<Quote>;
    updateStatus(id: string, status: string): Promise<Quote>;
}
