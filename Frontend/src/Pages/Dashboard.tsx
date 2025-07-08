import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { motion } from "framer-motion";

interface Message {
  user: string;
  text: string;
}

export default function ChatDashboard() {
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [username, setUsername] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (selectedRoom && username) {
      socketRef.current = new WebSocket("ws://localhost:8080");

      socketRef.current.onopen = () => {
        socketRef.current?.send(
          JSON.stringify({
            type: "join",
            payload: {
              roomid: selectedRoom,
              username,
            },
          })
        );
      };

      socketRef.current.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        setMessages((prev) => [...prev, { user: parsed.user, text: parsed.text }]);
      };

      return () => {
        socketRef.current?.close();
      };
    }
  }, [selectedRoom, username]);

  const handleSend = () => {
  if (message.trim() && socketRef.current) {
    const fullMessage = `${username}: ${message}`;
    socketRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: fullMessage,
        },
      })
    );
    setMessage(""); // Clear input
  }
};


  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleSend();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [message, username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex flex-col items-center p-6">
      <motion.h1
        className="text-4xl font-bold mb-6 text-white drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Join a Chat Room
      </motion.h1>

      {!isUsernameSet ? (
        <Card className="w-full max-w-sm">
          <CardContent className="p-4 flex flex-col gap-4">
            <Input
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={() => setIsUsernameSet(true)} disabled={!username.trim()}>
                Continue
            </Button>
          </CardContent>
        </Card>
      ) : selectedRoom ? (
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Room: {selectedRoom}</h2>
                <Button variant="ghost" onClick={() => setSelectedRoom(null)}>
                  Change Room
                </Button>
              </div>
              <div className="h-80 overflow-y-auto bg-white rounded-lg shadow-inner p-3 space-y-2">
                {messages.map((msg, i) => {
                const isSender = msg.user === username;

                return (
                    <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isSender ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`p-2 px-4 py-2 rounded-xl max-w-[70%] ${
                        isSender
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-black self-start"
                    }`}
                    >
                    <strong>{msg.user}</strong> {msg.text}
                    </motion.div>
                );
                })}

              </div>
              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleSend}>Send</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Card className="w-full max-w-sm">
          <CardContent className="p-4 flex flex-col gap-4">
            <Input
              placeholder="Enter room ID to join"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
            />
            <Button onClick={() => setSelectedRoom(roomInput.trim())} disabled={!roomInput.trim()}>
              Join Room
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
