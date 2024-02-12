import { User } from './entity/user';
import {UsersRepository} from "./users.repository";
import {NotFoundError, ValidationError} from "../app/app/errors";
import {Errors} from "../app/app/constants";
import * as uuid from 'uuid';
import {CreateBody} from "./entity/createBody";

export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(input: CreateBody): Promise<User> {
        return this.usersRepository.create(input);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        this.validateUserId(id)
        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new NotFoundError(Errors.ERR_USER_NOT_FOUND);
        }

        return user;
    }

    async remove(id: string): Promise<void> {
        this.validateUserId(id)
        await this.findOne(id);
        return this.usersRepository.remove(id);
    }

    async update(id: string, input: CreateBody): Promise<User> {
        await this.findOne(id);
        return this.usersRepository.update(id, input);
    }

    validateUserId(id: string) {
        if (!uuid.validate(id)) {
            throw new ValidationError(Errors.ERR_USERID_INVALID);
        }
    }
}
