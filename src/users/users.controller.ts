import {IncomingMessage, ServerResponse} from 'http';
import {Errors, Method, StatusCode} from "../app/app/constants";
import {UsersService} from "./users.service";
import {NotFoundError, ValidationError} from "../app/app/errors";
import {UsersRepository} from "./users.repository";
import {ValidateBody} from "../utils/validateBody";

export const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);

export const UsersController = async function (req: IncomingMessage, res: ServerResponse) {

    res.setHeader('Content-Type', 'application/json');
    const [api, users, id, ...rest] = req.url.split('/').filter(Boolean);

    const buffers = [] as any;
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const body = Buffer.concat(buffers).toString();

    if (`${api}/${users}` === 'api/users' && !rest.length) {
        let result;
        let statusCode = StatusCode.OK;

        try {
            switch (req.method) {
                case Method.GET:
                    result = await (id
                        ? usersService.findOne(id)
                        : usersService.findAll());
                    break;
                case Method.POST:
                    if (id) {
                        throw new NotFoundError(Errors.ERR_RESOURCE_NOT_FOUND);
                    }
                    result = await usersService.create(ValidateBody(body));
                    statusCode = StatusCode.CREATE_SUCCESSFUL;
                    break;
                case Method.DELETE:
                    result = await usersService.remove(id);
                    statusCode = StatusCode.NOT_CONTENT;
                    break;
                case Method.PUT:
                    result = await usersService.update(id, ValidateBody(body));
                    break;
                default:
                    throw new Error(Errors.ERR_UNSUPPORTED_OPERATION);
            }
        } catch (err: any) {
            if (err instanceof ValidationError) {
                statusCode = StatusCode.BAD_REQUEST;
            } else if (err instanceof NotFoundError) {
                statusCode = StatusCode.NOT_FOUND;
            } else if (err instanceof Error) {
                statusCode = StatusCode.INTERNAL_SERVER_ERROR;
                err.message = Errors.ERR_UNEXPECTED_ERROR;
            }
            result = {code: statusCode, message: err.message};
        }

        res.writeHead(statusCode);
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(StatusCode.NOT_FOUND);
        res.end(JSON.stringify({code: StatusCode.NOT_FOUND, message: Errors.ERR_RESOURCE_NOT_FOUND}));
    }
};
