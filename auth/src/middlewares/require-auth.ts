import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';
interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
	if (!req.currentUser) {
		throw new NotAuthorizedError();
	}

	next();
}; 