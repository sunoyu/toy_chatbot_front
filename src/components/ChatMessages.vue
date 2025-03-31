<template>
  <div class="chat-box">
    <div
      v-for="(msg, idx) in messages"
      :key="idx"
      class="d-flex mb-2"
      :class="msg.role == 'user' ? 'justify-end' : 'justify-start'"
    >
      <v-chip color="primary" v-if="msg.role === 'user'">{{ msg.text }}</v-chip>
      <v-chip color="grey lighten-2" v-else>{{ msg.text }}</v-chip>
    </div>
  </div>
</template>

<script setup>
defineProps(["messages"]);
</script>

<style scoped>
.chat-box {
  flex-grow: 1;
  overflow-y: auto;
  padding: 8px;
}
</style>
