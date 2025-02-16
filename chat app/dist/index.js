"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allsockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        const parsedmessage = JSON.parse(message);
        if (parsedmessage.type == 'join') {
            allsockets.push({
                socket,
                room: parsedmessage.payload.roomid
            });
        }
        if (parsedmessage.type == 'chat') {
            const CurrentUserRoom = (_a = allsockets.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            for (let i = 0; i < allsockets.length; i++) {
                if (allsockets[i].room == CurrentUserRoom) {
                    allsockets[i].socket.send(parsedmessage.payload.message);
                }
            }
        }
    });
});
