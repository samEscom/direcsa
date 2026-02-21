import { NextRequest } from 'next/server';
import { getQuoteController } from '@/lib/container';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return getQuoteController().getById(req, id);
}
