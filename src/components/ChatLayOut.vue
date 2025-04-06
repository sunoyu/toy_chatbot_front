<template>
  <v-app>
    <v-navigation-drawer app permanent width="250">
      <v-list>
        <v-list-item
          v-for="room in chatRooms"
          :key="room.id"
          :title="room.name"
          @click="selectedRoomId = room.id"
          :active="selectedRoomId === room.id"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="fill-height pa-4">
        <v-row class="fill-height">
          <v-col class="d-flex flex-column fill-height">
            <ChatMessages
              :messages="currentMessage"
              class="flex-grow-1 overflow-y-auto mb-4"
            />
            <ChatInput @send="addMessage" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, ref } from "vue";
import ChatMessages from "./ChatMessages.vue";
import ChatInput from "./ChatInput.vue";

// const messages = ref([
//   { role: "user", text: "안녕하세요!" },
//   { role: "bot", text: "안녕하세요, 무엇을 도와드릴까요?" },
// ]);

const chatRooms = ref([
  {
    id: 1,
    name: "Consulting",
    messages: [{ role: "user", text: "배송 언제오나요" }],
  },
  {
    id: 2,
    name: "기술 지원",
    messages: [
      { role: "user", text: "로그인이 안되요." },
      { role: "bot", text: "비밀번호를 재설정 해보세요." },
    ],
  },
]);

const selectedRoomId = ref(1);

const currentMessage = computed(() => {
  return (
    chatRooms.value.find((r) => r.id === selectedRoomId.value)?.messages || []
  );
});

function addMessage(text) {
  const room = chatRooms.value.find((r) => r.id === selectedRoomId.value);
  if (!room) return;

  room.messages.push({ role: "user", text, time: getCurrentTime() });

  const loadingMessage = {
    role: "bot",
    isLoading: true,
    time: getCurrentTime(),
  };
  room.messages.push(loadingMessage);

  // 봇 응답 시뮬레이션
  setTimeout(() => {
    const index = room.messages.indexOf(loadingMessage);
    if (index !== -1) {
      room.messages[index] = {
        role: "bot",
        text: "네, 어떤 도움이 필요하신가요?",
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
</script>
