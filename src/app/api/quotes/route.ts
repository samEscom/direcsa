import { NextRequest } from 'next/server';
import { getQuoteController } from '@/lib/container';

export async function GET(req: NextRequest) {
    return getQuoteController().getAll(req);
}

export async function POST(req: NextRequest) {
    return getQuoteController().create(req);
}
