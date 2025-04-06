<template>
  <div class="chat-messages-wrapper">
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
        >
          <template v-if="msg.isLoading">
            <v-progress-circular
              indeterminate
              color="grey-lighten-1"
              size="16"
            />
          </template>
          <template v-else>
            {{ msg.text }}
          </template>
        </v-chip>
      </div>
      <div ref="scrollTarget" />
    </div>
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
    scrollTarget.value?.scrollIntoView({ behavior: "smooth" });
    /*  ref="scrollTarget"으로 참조한 요소를 스크롤해서 화면에 보이게 함
behavior: 'smooth' → 부드럽게 스르륵 내려감
?.는 null이면 실행 안 함 (안전 처리)
*/
  },
  { deep: true }
);
</script>

<style scoped>
.chat-messages-wrapper {
  flex-grow: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.chat-messages {
  overflow-y: auto;
  flex-grow: 1;
  padding: 8px;
}
</style>
