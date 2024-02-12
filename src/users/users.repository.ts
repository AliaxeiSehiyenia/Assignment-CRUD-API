import * as uuid from 'uuid';
import {EventEmitter} from 'events';
import {User} from './entity/user';
import {CreateBody} from "./entity/createBody";

export class UsersRepository extends EventEmitter {
    private readonly users: User[] = [];

    async find(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            resolve(this.users);
        });
    }

    async findOne(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(this.users.filter((item) => item.id === id)[0]);
        });
    }

    async create(input: CreateBody): Promise<User> {
        return new Promise((resolve, reject) => {
            const user = Object.assign(new User(), { id: uuid.v4(), ...input });
            this.users.push(user);
            resolve(user);
        });
    }
}
