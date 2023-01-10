// Type Validation Error
import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

// You can use abstract as we are using here or interface
// interface CustomError {
// 	statusCode: number;
// 	serializeErrors(): {
// 		message: string;
// 		field?: string;
// 	}[]
// }

export class RequestValidationError extends CustomError {
	statusCode = 400;

	constructor(public errors: ValidationError[]) {
		super('Invalid request Parameters');

		// Extending Built in class
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeErrors() {
		return this.errors.map(err => {
			return { message: err.msg, field: err.param };
		});
	}
}
