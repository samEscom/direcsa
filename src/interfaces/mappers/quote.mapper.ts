import { Quote } from '@/src/domain/entities/Quote';
import { QuoteItem } from '@/src/domain/entities/QuoteItem';

export interface QuoteItemDTO {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

export interface QuoteDTO {
    id: string;
    userId: string;
    status: string;
    notes: string | null;
    total: number;
    items: QuoteItemDTO[];
    createdAt: string;
    updatedAt: string;
}

export function toQuoteItemDTO(item: QuoteItem): QuoteItemDTO {
    return {
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
    };
}

export function toQuoteDTO(quote: Quote): QuoteDTO {
    return {
        id: quote.id,
        userId: quote.userId,
        status: quote.status,
        notes: quote.notes,
        total: quote.total,
        items: quote.items.map(toQuoteItemDTO),
        createdAt: quote.createdAt.toISOString(),
        updatedAt: quote.updatedAt.toISOString(),
    };
}
