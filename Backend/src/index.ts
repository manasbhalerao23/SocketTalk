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
            const CurrentUserRoom = allsockets.find((x) => x.socket == socket)?.room;
            for(let i=0; i < allsockets.length; i++){
                if(allsockets[i].room == CurrentUserRoom){
                    allsockets[i].socket.send(parsedmessage.payload.message)
                }
            }
        }
    })
})