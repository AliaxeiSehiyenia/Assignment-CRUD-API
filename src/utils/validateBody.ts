import {CreateBody} from "../users/entity/createBody";
import {ValidationError} from "../app/app/errors";
import {Errors} from "../app/app/constants";

export function ValidateBody(input: string): CreateBody {
    let createUser: CreateBody;
    try {
        createUser = JSON.parse(input);
    } catch (err) {
        throw new ValidationError(Errors.ERR_BODY_INVALID_FORMAT);
    }

    if (typeof createUser.username !== 'string' ||
        typeof createUser.age !== 'number' ||
        !Array.isArray(createUser.hobbies) ||
        createUser.hobbies.some((item) => typeof item !== 'string')) {
        throw new ValidationError(Errors.ERR_BODY_VALIDATION);
    }

    createUser.username = createUser.username.trim();
    createUser.hobbies.map((item) => item.trim());

    if (!createUser.username) {
        throw new ValidationError(Errors.ERR_BODY_VALIDATION);
    }

    return createUser;
}
