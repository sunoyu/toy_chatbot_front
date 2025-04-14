import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStores = defineStore("chat", () => {
  const chatRooms = ref([]);
  const selectedRoomId = ref(null);

  function addRoom(name) {
    const newId = Date.now();
    chatRooms.value.push({
      id: newId,
      name,
      messages: [],
    });
    selectedRoomId.value = newId; // 새로운 방을 선택해준다.
  }

  function addMessage(text) {
    const room = chatRooms.value.find((r) => r.id === selectedRoomId.value);
    if (!room) return;
    room.messages.push({ role: "user", text, time: getCurrentTime() });

    const loadingMsg = {
      role: "bot",
      isLoading: true,
      time: getCurrentTime(),
    };

    room.messages.push(loadingMsg);
    setTimeout(() => {
      const i = room.messages.indexOf(loadingMsg);
      if (i !== -1) {
        room.messages[i] = {
          role: "bot",
          text: "무엇을 도와드릴까요?",
          time: getCurrentTime(),
        };
      }
    }, 1500);
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return {
    chatRooms,
    selectedRoomId,
    addRoom,
    addMessage,
  };
});
