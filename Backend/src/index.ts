import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port:8080});

interface User{
    socket: WebSocket;
    room: string;
}

let allsockets: User[] = [];

wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedmessage = JSON.parse(message as unknown as string);
        if(parsedmessage.type == 'join'){
            allsockets.push({
                socket,
                room: parsedmessage.payload.roomid
                }
            )
        }
        if(parsedmessage.type == 'chat'){
            const sender = allsockets.find((u) => u.socket === socket);
            if (!sender) return; // safeguard
            const { room: senderRoom } = sender;
            const { user, message: text } = parsedmessage.payload;

            const payload = JSON.stringify({
                user,
                text,
            });
            allsockets.forEach((u) => {
                if (u.room === senderRoom && u.socket.readyState === WebSocket.OPEN) {
                u.socket.send(payload);
                }
            });
        }
    });

    socket.on("close", () => {
        allsockets = allsockets.filter((u) => u.socket !== socket);
    });
});