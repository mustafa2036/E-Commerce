// 2
// خت نسخه من Error
export class AppError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode;
    }
}