import http from "http";

const PORT = process.env.PORT || 4000;
const server = http.createServer();

export const app = () => {
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
};