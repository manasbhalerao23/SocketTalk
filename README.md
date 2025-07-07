# SocketTalk

SocketTalk is a real-time chat application built with a TypeScript-based WebSocket backend and a modern React + TypeScript + Tailwind frontend. The project demonstrates how to create multi-room chat functionality using WebSockets for instant message delivery between clients.

## Features

- **Real-Time Messaging**: Instantly send and receive messages using WebSockets.
- **Multi-Room Support**: Users can join specific chat rooms and communicate with others in the same room.
- **Modern Frontend**: Responsive UI built with React, TypeScript, Vite, and Tailwind CSS.

## Project Structure

```
SocketTalk/
├── Backend/         # Node.js + TypeScript WebSocket server
│   └── src/
│       └── index.ts
├── Frontend/        # React + TypeScript + Vite + Tailwind frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.

### Backend Setup

1. Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the WebSocket server:
    ```bash
    npm start
    ```
   The backend will listen for WebSocket connections on port `8080`.

### Frontend Setup

1. Navigate to the `Frontend` directory:
    ```bash
    cd Frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
   The frontend will be available at `http://localhost:3000`.

## Usage

- Open the frontend in your browser.
- Enter a chat room (handled automatically by the client).
- Start sending and receiving messages in real-time with others connected to the same room.

## Technologies Used

- **Backend**: Node.js, TypeScript, [ws (WebSocket)](https://github.com/websockets/ws)
- **Frontend**: React, TypeScript, Vite, Tailwind CSS

## Customization

- To modify chat logic or add authentication, edit the backend code in `Backend/src/index.ts`.
- To style or enhance the UI, update React components and Tailwind classes in `Frontend/src/`.


---

**Author:** [manasbhalerao23](https://github.com/manasbhalerao23)
