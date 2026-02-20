import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '7d';

export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

export async function signToken(payload: Record<string, unknown>): Promise<string> {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET no está configurado');
    }
    const secret = new TextEncoder().encode(JWT_SECRET);
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRES_IN)
        .sign(secret);
}

export async function verifyToken(token: string): Promise<JwtPayload> {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET no está configurado');
    }
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JwtPayload;
}
