<template>
  <v-row>
    <v-col cols="10">
      <v-text-field
        v-model="input"
        label="메시지를 입력하세요"
        @keydown.enter.prevent="send"
      />
    </v-col>
    <v-col cols="2">
      <v-btn @click="send" color="primary">전송</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["send"]);
const input = ref("");

function send() {
  const trimed = input.value.trim();
  if (!trimed) return;
  emit("send", trimed);
  input.value = "";
}
</script>
