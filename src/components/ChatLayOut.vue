<template>
  <v-app>
    <v-navigation-drawer app permanent width="250">
      <v-list>
        <v-list-item
          title="➕ 새 대화 시작"
          @click="handleNewRoom"
          class="text-primary"
        />

        <v-list-item
          v-for="room in chatRooms"
          :key="room.id"
          :title="room.name"
          @click="selectedRoomId = room.id"
          :active="selectedRoomId === room.id"
        />
        <v-btn
          icon
          @click="deleteCurrentRoom"
          density="compact"
          color="error"
          class="ml-2"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="fill-height pa-4">
        <v-row class="fill-height">
          <v-col class="d-flex flex-column fill-height">
            <ChatMessages
              :messages="currentMessages"
              class="flex-grow-1 overflow-y-auto mb-4"
            />
            <ChatInput @send="handleSend" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import ChatMessages from "./ChatMessages.vue";
import ChatInput from "./ChatInput.vue";
import { useChatStores } from "@/stores/chat";
import { storeToRefs } from "pinia";

// const messages = ref([
//   { role: "user", text: "안녕하세요!" },
//   { role: "bot", text: "안녕하세요, 무엇을 도와드릴까요?" },
// ]);

const chatStore = useChatStores();
const { chatRooms, selectedRoomId } = storeToRefs(chatStore); // 구조분해  - → storeToRefs()는 반응성 유지하면서 꺼내는 helper 함수야. 💡 참고: storeToRefs()로 구조 분해했을 때는 .value는 꼭 써야 함

const currentMessages = computed(() => {
  return (
    chatRooms.value.find((r) => r.id === selectedRoomId.value)?.messages || []
  );
});

function handleSend(text) {
  chatStore.addMessage(text);
}

function handleNewRoom() {
  chatStore.addRoom();
}

// const chatRooms = ref([
//   {
//     id: 1,
//     name: "Consulting",
//     messages: [{ role: "user", text: "배송 언제오나요" }],
//   },
//   {
//     id: 2,
//     name: "기술 지원",
//     messages: [
//       { role: "user", text: "로그인이 안되요." },
//       { role: "bot", text: "비밀번호를 재설정 해보세요." },
//     ],
//   },
// ]);

const stored = localStorage.getItem("chatRooms");
if (stored) {
  chatRooms.value = JSON.parse(stored);
}

watch(
  chatRooms,
  (newVal) => {
    localStorage.setItem("chatRooms", JSON.stringify(newVal));
  },
  { deep: true }
);

// const selectedRoomId = ref(1);

// const currentMessage = computed(() => {
//   return (
//     chatRooms.value.find((r) => r.id === selectedRoomId.value)?.messages || []
//   );
// });

// function addMessage(text) {
//   const room = chatRooms.value.find((r) => r.id === selectedRoomId.value);
//   if (!room) return;

//   room.messages.push({ role: "user", text, time: getCurrentTime() });

//   const loadingMessage = {
//     role: "bot",
//     isLoading: true,
//     time: getCurrentTime(),
//   };
//   room.messages.push(loadingMessage);

//   // 봇 응답 시뮬레이션
//   setTimeout(() => {
//     const index = room.messages.indexOf(loadingMessage);
//     if (index !== -1) {
//       room.messages[index] = {
//         role: "bot",
//         text: "네, 어떤 도움이 필요하신가요?",
//         time: getCurrentTime(),
//       };
//     }
//   }, 1500);
// }

// function getCurrentTime() {
//   const now = new Date();
//   return now.toLocaleTimeString("ko-KR", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }
// function addNewRoom() {
//   const newId = Math.max(...chatRooms.value.map((r) => r.id)) + 1;
//   // map → [1, 5, 3]
//   // Math.max(...[1, 5, 3]) → 5
//   // newId = 5 + 1 = 6

//   const newRoom = {
//     id: newId,
//     name: `새 대화 ${newId}`,
//     messages: [],
//   };
//   chatRooms.value.push(newRoom);
//   selectedRoomId.value = newId;
// }

function deleteCurrentRoom() {
  const index = chatRooms.value.findIndex((r) => r.id === selectedRoomId.value);
  //   chatRooms.value는 현재 대화방들의 배열
  // findIndex()는 조건을 만족하는 첫 번째 요소의 인덱스를 반환
  // r.id === selectedRoomId.value → 현재 선택된 방의 ID와 같은 방을 찾음
  // 예: 선택된 방이 id 3이고 배열이 [1, 2, 3]이면 index는 2가 됨
  if (index !== -1) {
    chatRooms.value.splice(index, 1);
    // 배열에서 해당 인덱스 위치의 요소를 1개 제거함
    // 원본 배열이 직접 수정됨

    if (chatRooms.value.length > 0) {
      selectedRoomId.value = chatRooms.value[0].id;
    } else {
      selectedRoomId.value = null;
    }
  }
}
</script>
