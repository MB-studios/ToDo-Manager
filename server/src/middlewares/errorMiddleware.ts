import { NextFunction, Request, Response } from 'express';
import { ERROR_CODES } from '../constants/error-codes';

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	let { errors, type, status, errorCode, message, details } = error;
	if (errors || type === 'entity.parse.failed' || type === 'mquery.parse.failed') {
		console.log(error);
		return res.status(status || 400).json({
			status: 'fail',
			data: {
				errorCode: ERROR_CODES.INVALID_REQUEST,
				message: 'Invalid request',
				details: errors,
			},
		});
	}
	if (status < 500) {
		return res.status(status).json({
			status: 'fail',
			data: {
				errorCode: errorCode,
				message: message,
				details: details,
			},
		});
	}
	res.status(500).json({
		errorCode: ERROR_CODES.UNKNOWN_ERROR,
		message: 'Unknown error',
		details: details,
	});
};
