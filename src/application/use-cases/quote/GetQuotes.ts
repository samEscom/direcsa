import { Quote } from '../../domain/entities/Quote';
import { IQuoteRepository } from '../../domain/repositories/IQuoteRepository';

export class GetQuotes {
    constructor(private readonly quoteRepository: IQuoteRepository) { }

    async execute(userId?: string): Promise<Quote[]> {
        return this.quoteRepository.findAll(userId);
    }
}
