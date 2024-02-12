import 'dotenv/config';
import http from "http";
import {UsersController, usersRepository} from "../../users/users.controller";
import {parseArgs} from "../../utils/args";
import cluster from "cluster";
import os from "os";

const PORT = process.env.PORT || 4000;
const server = http.createServer(UsersController);
const args = parseArgs();

export const app = () => {
    if (args['cluster']) {
        if (cluster.isPrimary) {
            const numCPUs = os.cpus().length;

            console.log(`Primary ${process.pid} is running`);

            for (let i = 0; i < numCPUs; i++) {
                cluster.fork({WORKER_PORT: +PORT + i + 1});
            }

            cluster.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`);
            });

            cluster.on('message', async (worker, message) => {
                if (message.cmd in usersRepository) {
                    const data = await usersRepository[message.cmd](...message.data);
                    worker.send({cmd: message.cmd, data});
                }
            });
        } else {
            const PORT = +process.env.WORKER_PORT
            server.listen(PORT, () => {
                console.log(
                    `Worker ${process.pid} server running at http://localhost:${PORT}/`,
                );
            });

            process.on('message', (message) => {
                usersRepository.emit(message['cmd'], message);
            });
        }
    } else {
        server.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });
    }
};