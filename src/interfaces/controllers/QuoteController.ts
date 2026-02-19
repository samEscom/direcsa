import { NextRequest, NextResponse } from 'next/server';
import { GetQuotes } from '@/src/application/use-cases/quote/GetQuotes';
import { GetQuoteById } from '@/src/application/use-cases/quote/GetQuoteById';
import { CreateQuote } from '@/src/application/use-cases/quote/CreateQuote';
import { toQuoteDTO } from '@/src/interfaces/mappers/quote.mapper';
import { verifyToken } from '@/src/infrastructure/auth/jwt';
import { Role } from '@/src/domain/enums/Role';

export class QuoteController {
    constructor(
        private readonly getQuotes: GetQuotes,
        private readonly getQuoteById: GetQuoteById,
        private readonly createQuote: CreateQuote,
    ) { }

    private getTokenPayload(req: NextRequest) {
        const token =
            req.cookies.get('token')?.value ??
            req.headers.get('authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('No autenticado');
        return verifyToken(token);
    }

    async getAll(req: NextRequest): Promise<NextResponse> {
        try {
            const payload = this.getTokenPayload(req);
            // ADMIN sees all, BUYER sees only their own
            const userId = payload.role === Role.ADMIN ? undefined : payload.sub;
            const quotes = await this.getQuotes.execute(userId);
            return NextResponse.json({ quotes: quotes.map(toQuoteDTO) });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al obtener cotizaciones';
            const status = message.includes('autenticado') ? 401 : 500;
            return NextResponse.json({ error: message }, { status });
        }
    }

    async getById(req: NextRequest, id: string): Promise<NextResponse> {
        try {
            this.getTokenPayload(req);
            const quote = await this.getQuoteById.execute(id);
            return NextResponse.json({ quote: toQuoteDTO(quote) });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al obtener cotización';
            const status = message.includes('no encontrada') ? 404 : message.includes('autenticado') ? 401 : 500;
            return NextResponse.json({ error: message }, { status });
        }
    }

    async create(req: NextRequest): Promise<NextResponse> {
        try {
            const payload = this.getTokenPayload(req);
            const body = await req.json();
            const quote = await this.createQuote.execute({
                userId: payload.sub,
                notes: body.notes,
                items: body.items,
            });
            return NextResponse.json({ quote: toQuoteDTO(quote) }, { status: 201 });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al crear cotización';
            const status = message.includes('autenticado') ? 401 : 400;
            return NextResponse.json({ error: message }, { status });
        }
    }
}
