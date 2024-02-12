import * as uuid from 'uuid';
import {EventEmitter} from 'events';
import {User} from './entity/user';
import {CreateBody} from "./entity/createBody";
import {usersBD} from "../BD/userBD";
import {Command, Errors} from "../app/app/constants";
import cluster from "cluster";

export class UsersRepository extends EventEmitter {

    private async requestMasterForData(obj): Promise<any> {
        return new Promise((resolve, reject) => {
            const result = process.send(obj, () => {
                this.once(obj.cmd, (msg) => {
                    resolve(msg['data']);
                });
            });
            if (!result) {
                throw new Error(Errors.ERR_UNEXPECTED_ERROR);
            }
        });
    }

    async find(): Promise<User[]> {
        if (cluster.isWorker) {
            const obj = {cmd: Command.FIND, data: []};
            return this.requestMasterForData(obj);
        } else {
            return new Promise((resolve, reject) => {
                resolve(usersBD);
            });
        }
    }

    async findOne(id: string): Promise<User> {
        if (cluster.isWorker) {
            const obj = {cmd: Command.FIND_ONE, data: [id]};
            return this.requestMasterForData(obj);
        } else {
            return new Promise((resolve, reject) => {
                resolve(usersBD.find((item) => item.id === id));
            });
        }
    }

    async create(input: CreateBody): Promise<User> {
        if (cluster.isWorker) {
            const obj = {cmd: Command.CREATE, data: [input]};
            return this.requestMasterForData(obj);
        } else {
            return new Promise((resolve, reject) => {
                const user = Object.assign(new User(), {id: uuid.v4(), ...input});
                usersBD.push(user);
                resolve(user);
            });
        }
    }

    async remove(id: string): Promise<User> {
        if (cluster.isWorker) {
            const obj = {cmd: Command.REMOVE, data: [id]};
            return this.requestMasterForData(obj);
        } else {
            return new Promise((resolve, reject) => {
                const index = usersBD.findIndex((item) => item.id === id);
                if (index !== -1) {
                    const user = usersBD.splice(index, 1)[0];
                    resolve(user);
                }
                resolve(undefined);
            });
        }
    }

    async update(id: string, input: CreateBody): Promise<User> {
        if (cluster.isWorker) {
            const obj = {cmd: Command.UPDATE, data: [id, input]};
            return this.requestMasterForData(obj);
        } else {
            const oldUser = await this.findOne(id);
            return new Promise(async (resolve, reject) => {
                const user = Object.assign(oldUser, input);
                resolve(user);
            });
        }
    }
}
