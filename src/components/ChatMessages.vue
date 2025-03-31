<template>
  <div class="chat-messages">
    <div
      v-for="(msg, idx) in messages"
      :key="idx"
      class="d-flex mb-2"
      :class="msg.role == 'user' ? 'justify-end' : 'justify-start'"
    >
      <v-chip
        :color="msg.role == 'user' ? 'primary' : 'grey lighten-2'"
        text-color="white"
        class="ma-1"
        >{{ msg.text }}</v-chip
      >
    </div>
    <div ref="scrollTarget"></div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
});

const scrollTarget = ref(null);

watch(
  () => props.messages,
  async () => {
    await nextTick();
    scrollTarget.value?.scrollIntoView({ behavior: "smmoth" });
  },
  { deep: true }
);
</script>

<style scoped>
.chat-box {
  flex-grow: 1;
  overflow-y: auto;
  padding: 8px;
}
</style>
