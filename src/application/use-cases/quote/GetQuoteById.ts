import { Quote } from '@/src/domain/entities/Quote';
import { IQuoteRepository } from '@/src/domain/repositories/IQuoteRepository';

export class GetQuoteById {
    constructor(private readonly quoteRepository: IQuoteRepository) { }

    async execute(id: string): Promise<Quote> {
        if (!id) throw new Error('ID de cotización requerido');
        const quote = await this.quoteRepository.findById(id);
        if (!quote) throw new Error('Cotización no encontrada');
        return quote;
    }
}
