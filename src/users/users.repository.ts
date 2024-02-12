import * as uuid from 'uuid';
import {EventEmitter} from 'events';
import {User} from './entity/user';
import {CreateBody} from "./entity/createBody";
import {usersBD} from "../BD/userBD";

export class UsersRepository extends EventEmitter {
    async find(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            resolve(usersBD);
        });
    }

    async findOne(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(usersBD.find((item) => item.id === id));
        });
    }

    async create(input: CreateBody): Promise<User> {
        return new Promise((resolve, reject) => {
            const user = Object.assign(new User(), {id: uuid.v4(), ...input});
            usersBD.push(user);
            resolve(user);
        });
    }

    async remove(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            const index = usersBD.findIndex((item) => item.id === id);
            if (index != -1) {
                const user = usersBD.splice(index, 1)[0];
                resolve(user);
            }
            resolve(undefined);
        });
    }
}
