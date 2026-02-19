import { PrismaClient } from '@prisma/client';
import { Product } from '@/src/domain/entities/Product';
import {
    IProductRepository,
    CreateProductData,
    UpdateProductData,
} from '@/src/domain/repositories/IProductRepository';

export class PrismaProductRepository implements IProductRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findAll(onlyActive = false): Promise<Product[]> {
        const records = await this.prisma.product.findMany({
            where: onlyActive ? { isActive: true } : undefined,
            orderBy: { createdAt: 'desc' },
        });
        return records.map(this.toDomain);
    }

    async findById(id: string): Promise<Product | null> {
        const record = await this.prisma.product.findUnique({ where: { id } });
        if (!record) return null;
        return this.toDomain(record);
    }

    async findBySku(sku: string): Promise<Product | null> {
        const record = await this.prisma.product.findUnique({ where: { sku } });
        if (!record) return null;
        return this.toDomain(record);
    }

    async create(data: CreateProductData): Promise<Product> {
        const record = await this.prisma.product.create({ data });
        return this.toDomain(record);
    }

    async update(id: string, data: UpdateProductData): Promise<Product> {
        const record = await this.prisma.product.update({ where: { id }, data });
        return this.toDomain(record);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.product.delete({ where: { id } });
    }

    private toDomain(record: {
        id: string;
        name: string;
        description: string | null;
        sku: string;
        price: number;
        unit: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }): Product {
        return new Product(
            record.id,
            record.name,
            record.description,
            record.sku,
            record.price,
            record.unit,
            record.isActive,
            record.createdAt,
            record.updatedAt,
        );
    }
}
