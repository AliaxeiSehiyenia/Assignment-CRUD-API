export const enum Errors {
    ERR_USERID_INVALID = 'User id is invalid',
    ERR_USER_NOT_FOUND = 'User not found',
    ERR_BODY_INVALID_FORMAT = 'Invalid request body format',
    ERR_BODY_VALIDATION = 'Request body does not contain required fields',
    ERR_UNSUPPORTED_OPERATION = 'Unsupported operation',
    ERR_RESOURCE_NOT_FOUND = "Requested resource doesn't exist",
    ERR_UNEXPECTED_ERROR = 'Unexpected error has occured, try again later',
}

export const enum StatusCode {
    OK = 200,
    CREATE_SUCCESSFUL = 201,
    NOT_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export const enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export const enum Command {
    FIND = 'find',
    FIND_ONE = 'findOne',
    CREATE = 'create',
    REMOVE = 'remove',
    UPDATE = 'update',
}