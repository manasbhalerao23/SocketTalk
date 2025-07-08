"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allsockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedmessage = JSON.parse(message);
        if (parsedmessage.type == 'join') {
            allsockets.push({
                socket,
                room: parsedmessage.payload.roomid
            });
        }
        if (parsedmessage.type == 'chat') {
            const sender = allsockets.find((u) => u.socket === socket);
            if (!sender)
                return; // safeguard
            const { room: senderRoom } = sender;
            const { user, message: text } = parsedmessage.payload;
            const payload = JSON.stringify({
                user,
                text,
            });
            allsockets.forEach((u) => {
                if (u.room === senderRoom && u.socket.readyState === ws_1.WebSocket.OPEN) {
                    u.socket.send(payload);
                }
            });
        }
    });
    socket.on("close", () => {
        allsockets = allsockets.filter((u) => u.socket !== socket);
    });
});
