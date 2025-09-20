<template>
  <v-row>
    <v-col cols="10">
      <v-text-field
        v-model="input"
        label="메시지를 입력하세요"
        @compositionstart="isComposing = true"
        @compositionend="onCompositionEnd"
        @keyup.enter.prevent.stop="onEnter"
      />
    </v-col>
    <v-col cols="2">
      <v-btn type="button" @click="send" color="primary">전송</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["send"]);
const input = ref("");
const isComposing = ref(false);

function send() {
  const trimed = input.value.trim();
  console.log("[send]");
  if (!trimed) return;
  emit("send", trimed);
  input.value = "";
}

function onEnter() {
  // 한글/일본어 등 IME 조합 중 Enter는 무시
  if (isComposing.value) return;
  send();
}

function onCompositionEnd() {
  // 조합 입력 종료 표시
  isComposing.value = false;
}
</script>
