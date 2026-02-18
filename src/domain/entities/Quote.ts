import { QuoteStatus } from '../enums/QuoteStatus';
import { QuoteItem } from './QuoteItem';

export class Quote {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly status: QuoteStatus,
        public readonly notes: string | null,
        public readonly total: number,
        public readonly items: QuoteItem[],
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static validate(userId: string, items: { productId: string; quantity: number; unitPrice: number }[]): void {
        if (!userId) {
            throw new Error('El usuario es requerido');
        }
        if (!items || items.length === 0) {
            throw new Error('La cotización debe tener al menos un producto');
        }
        items.forEach((item, index) => {
            QuoteItem.validate(item.productId, item.quantity, item.unitPrice);
        });
    }

    static calculateTotal(items: { quantity: number; unitPrice: number }[]): number {
        return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    }
}
