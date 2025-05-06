<template>
  <v-row>
    <v-col cols="10">
      <v-text-field
        v-model="input"
        label="메시지를 입력하세요"
        @keydown.enter.prevent.stop="send"
      />
    </v-col>
    <v-col cols="2">
      <v-btn type="button" @click="send" color="primary">전송</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import WebSocketService from "@/services/WebSocketService";
import { ref } from "vue";
const emit = defineEmits(["send"]);
const input = ref("");

function send() {
  const trimed = input.value.trim();
  console.log("[send]");
  if (!trimed) return;
  emit("send", trimed);
  input.value = "";
}

WebSocketService.connect(roomId, (message) => {
  console.log("Received message:", message);
  // store.push(msg) 또는 messages.value.push(msg) 등으로 반영
});

WebSocketService.sendMessage(roomId, {
  role: "user",
  text: input.value,
  time: new Date(),
});
</script>
