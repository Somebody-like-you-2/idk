import express from "express";
import { createServer } from "http";
import {router} from "./routes.js";
import { setupWebSocketServer } from "./websocket/websocket.js";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(router);

setupWebSocketServer(server);

export { app, server };