import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '7d';

export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

export function signToken(payload: Record<string, unknown>): string {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET no está configurado');
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET no está configurado');
    }
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
