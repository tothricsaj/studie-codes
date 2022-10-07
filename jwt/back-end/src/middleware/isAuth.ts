import { Express, Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

interface CustonRequest extends Request {
	user?: string;
}

const isAuth = (_req: CustonRequest, _res: Response, _next: NextFunction) => {
	const authHeader = _req.get('Authorization');
	const token = authHeader && authHeader?.split(' ')[1];

	if(token === null) return _res.sendStatus(401);

	verify(token as string, 'somesupersecretsecret', (err, user) => {
		console.log('Error -> ', err);

		if(err) return _res.sendStatus(403)
		
		_req.user = user as string;

		_next();
	});

}

export default isAuth;