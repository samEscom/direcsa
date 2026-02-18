export class QuoteItem {
    constructor(
        public readonly id: string,
        public readonly quoteId: string,
        public readonly productId: string,
        public readonly quantity: number,
        public readonly unitPrice: number,
        public readonly subtotal: number,
    ) { }

    static validate(productId: string, quantity: number, unitPrice: number): void {
        if (!productId) {
            throw new Error('El producto es requerido');
        }
        if (!quantity || quantity < 1) {
            throw new Error('La cantidad debe ser al menos 1');
        }
        if (unitPrice === undefined || unitPrice < 0) {
            throw new Error('El precio unitario debe ser mayor o igual a 0');
        }
    }

    static calculateSubtotal(quantity: number, unitPrice: number): number {
        return quantity * unitPrice;
    }
}
