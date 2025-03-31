<template>
  <v-app>
    <v-navigation-drawer app permanent width="250">
      <v-list>
        <v-list-item title="대화 1" />
        <v-list-item title="대화 2" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="fill-height pa-4">
        <v-row>
          <v-col>
            <ChatMessages
              :messages="messages"
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
import { ref } from "vue";
import ChatMessages from "./ChatMessages.vue";
import ChatInput from "./ChatInput.vue";

const messages = ref([
  { role: "user", text: "안녕하세요!" },
  { role: "bot", text: "안녕하세요, 무엇을 도와드릴까요?" },
]);

function addMessage(text) {
  messages.value.push({ role: "user", text });
  // 이후에 봇 응답이나 로딩 처리 추가 가능
}
</script>
