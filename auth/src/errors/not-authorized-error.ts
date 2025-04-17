import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401; // HTTP status code for Unauthorized

    constructor() {
        super('Not authorized'); // Call the constructor of the parent class with a custom message
        Object.setPrototypeOf(this, NotAuthorizedError.prototype); // Set the prototype explicitly to maintain the correct prototype chain
    }

    serializeErrors() {
        return [{ message: 'Not authorized' }]; // Return an array of error objects with a message property
    }
}
