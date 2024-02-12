import http from "http";
import {UsersController} from "../../users/users.controller";

const PORT = process.env.PORT || 4000;
const server = http.createServer(UsersController);

export const app = () => {
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
};