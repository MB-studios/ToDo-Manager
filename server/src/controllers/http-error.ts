import { CustomError } from 'ts-custom-error';

export default class HttpError extends CustomError {
	public status: number;
	constructor(public errorCode: number, message: string, public details: string = '') {
		super(message);
		this.status = this.errorCode;
	}
}
