class ApiError extends Error{
    constructor(status, message) {
        //call parent constructor
        super();
        this.status = status;
        this.message = message;
    };

    static badRequest(message) {
        return new ApiError(400,message);
    };

    static internal(message) {
        return new ApiError(500,message);
    };

    static forbidden(message) {
        return new ApiError(403,message);
    };

    static notFound(message) {
        return new ApiError(404,message);
    };

    static unprocessableEntity(message) {
        return new ApiError(422,message);
    };

    static internalServerError(message) {
        return new ApiError(500,message);
    };

}

module.exports = ApiError;