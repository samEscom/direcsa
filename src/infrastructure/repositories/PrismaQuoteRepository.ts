import { PrismaClient } from '@prisma/client';
import { Quote } from '../../domain/entities/Quote';
import { QuoteItem } from '../../domain/entities/QuoteItem';
import { IQuoteRepository, CreateQuoteData } from '../../domain/repositories/IQuoteRepository';
import { QuoteStatus } from '../../domain/enums/QuoteStatus';

export class PrismaQuoteRepository implements IQuoteRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findAll(userId?: string): Promise<Quote[]> {
        const records = await this.prisma.quote.findMany({
            where: userId ? { userId } : undefined,
            include: { items: true },
            orderBy: { createdAt: 'desc' },
        });
        return records.map(this.toDomain);
    }

    async findById(id: string): Promise<Quote | null> {
        const record = await this.prisma.quote.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!record) return null;
        return this.toDomain(record);
    }

    async create(data: CreateQuoteData): Promise<Quote> {
        const total = data.items.reduce(
            (sum, item) => sum + item.quantity * item.unitPrice,
            0,
        );

        const record = await this.prisma.quote.create({
            data: {
                userId: data.userId,
                notes: data.notes,
                total,
                items: {
                    create: data.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        subtotal: item.quantity * item.unitPrice,
                    })),
                },
            },
            include: { items: true },
        });

        return this.toDomain(record);
    }

    async updateStatus(id: string, status: string): Promise<Quote> {
        const record = await this.prisma.quote.update({
            where: { id },
            data: { status: status as QuoteStatus },
            include: { items: true },
        });
        return this.toDomain(record);
    }

    private toDomain(record: {
        id: string;
        userId: string;
        status: string;
        notes: string | null;
        total: number;
        createdAt: Date;
        updatedAt: Date;
        items: {
            id: string;
            quoteId: string;
            productId: string;
            quantity: number;
            unitPrice: number;
            subtotal: number;
        }[];
    }): Quote {
        const items = record.items.map(
            (item) =>
                new QuoteItem(
                    item.id,
                    item.quoteId,
                    item.productId,
                    item.quantity,
                    item.unitPrice,
                    item.subtotal,
                ),
        );

        return new Quote(
            record.id,
            record.userId,
            record.status as QuoteStatus,
            record.notes,
            record.total,
            items,
            record.createdAt,
            record.updatedAt,
        );
    }
}
