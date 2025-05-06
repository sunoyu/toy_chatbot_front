import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    this.stompClient = null;
  }

  connect(roomId, onMessageReceived) {
    const socket = new SockJS("http://localhost:8080/ws");
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log("[WebSocket]", str),
      onConnect: () => {
        console.log("✅ WebSocket connected");
        this.stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
          const payload = JSON.parse(message.body);
          onMessageReceived(payload);
        });
      },
      reconnectDelay: 5000,
    });
    this.stompClient.activate();
  }

  sendMessage(roomId, message) {
    if (!this.stompClient || !this.stompClient.connected) return;
    this.stompClient.publish({
      destination: `/app/chat.send/${roomId}`,
      body: JSON.stringify(message),
    });
  }

  disconnect() {
    if (this.stompClient) this.stompClient.deactivate();
  }
}

export default new WebSocketService();
