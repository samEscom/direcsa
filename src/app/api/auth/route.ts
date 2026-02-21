import { NextRequest } from 'next/server';
import { getAuthController } from '@/lib/container';

export async function POST(req: NextRequest) {
    const body = await req.clone().json().catch(() => ({}));
    const action = body?.action;

    const controller = getAuthController();

    if (action === 'register') {
        return controller.register(req);
    }
    if (action === 'login') {
        return controller.login(req);
    }
    if (action === 'logout') {
        return controller.logout(req);
    }

    return Response.json({ error: 'Acción no válida. Usa: register, login, logout' }, { status: 400 });
}
