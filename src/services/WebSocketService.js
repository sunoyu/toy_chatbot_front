class WebSocketService {
  constructor() {
    this.socket = null;
    this.roomId = null;
    this.onMessageCallback = null;
  }

  connect(roomId, onMessage) {
    this.roomId = roomId;
    this.onMessageCallback = onMessage;

    this.socket = new WebSocket(`ws://localhost:8080/ws/chat/${roomId}`);

    this.socket.onopen = () => {
      console.log(this.roomId);
      console.log("✅ WebSocket 연결됨");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📨 받은 메시지:", data);
      if (this.onMessageCallback) {
        this.onMessageCallback(data);
      }
    };

    this.socket.onclose = () => {
      console.log("❌ WebSocket 연결 종료");
    };

    this.socket.onerror = (err) => {
      console.error("💥 WebSocket 오류", err);
    };
  }

  sendMessage(message) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn("소켓이 연결되어 있지 않음");
      return;
    }

    this.socket.send(JSON.stringify(message));
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export default new WebSocketService();
