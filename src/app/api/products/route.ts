import { NextRequest } from 'next/server';
import { getProductController } from '@/lib/container';

export async function GET(req: NextRequest) {
    return getProductController().getAll(req);
}

export async function POST(req: NextRequest) {
    return getProductController().create(req);
}
