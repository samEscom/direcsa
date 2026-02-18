import { Quote } from '../../domain/entities/Quote';
import { IQuoteRepository, CreateQuoteData } from '../../domain/repositories/IQuoteRepository';

export interface CreateQuoteItemDTO {
    productId: string;
    quantity: number;
    unitPrice: number;
}

export interface CreateQuoteDTO {
    userId: string;
    notes?: string;
    items: CreateQuoteItemDTO[];
}

export class CreateQuote {
    constructor(private readonly quoteRepository: IQuoteRepository) { }

    async execute(dto: CreateQuoteDTO): Promise<Quote> {
        // Domain validation
        Quote.validate(dto.userId, dto.items);

        const data: CreateQuoteData = {
            userId: dto.userId,
            notes: dto.notes,
            items: dto.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
            })),
        };

        return this.quoteRepository.create(data);
    }
}
