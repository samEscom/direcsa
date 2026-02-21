import { NextRequest } from 'next/server';
import { getProductController } from '@/lib/container';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return getProductController().getById(req, id);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return getProductController().update(req, id);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return getProductController().delete(req, id);
}
