export class Product {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string | null,
        public readonly sku: string,
        public readonly price: number,
        public readonly unit: string,
        public readonly isActive: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static validate(name: string, sku: string, price: number): void {
        if (!name || name.trim().length < 2) {
            throw new Error('El nombre del producto debe tener al menos 2 caracteres');
        }
        if (!sku || sku.trim().length === 0) {
            throw new Error('El SKU es requerido');
        }
        if (price === undefined || price < 0) {
            throw new Error('El precio debe ser mayor o igual a 0');
        }
    }
}
