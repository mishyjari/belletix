import { CustomError } from './customError';

export class DatabaseConnectionError extends CustomError {

    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super('Error Connecting to datbase');

        // Necessary for extending a built in class with typescript
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [{
            message: this.reason
        }]
    }
}