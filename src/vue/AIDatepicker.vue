<script setup>
import { ref } from 'vue';
import {fetchDate, tryCatch} from "../core";

const props = defineProps({
  aidp: {
    type: String,
    default: 'default'
  },
  placeholder: {
    type: String,
    default: 'Enter a date query'
  }
});

const emit = defineEmits(['fetching', 'error', 'selected', 'done']);

const query = ref('');
const result = ref('');


const handleFetch = async () => {
  emit('fetching');

  const { data, error } = await tryCatch(fetchDate(query.value));

  if (error) {
    emit('error', error);
  } else {
    result.value = data;
    emit('selected', data);
  }

  emit('done', error);
};
</script>

<template>
  <div>
    <input
        :placeholder="placeholder"
        v-model="query"
        @keydown.enter="handleFetch"
        :data-aidp="aidp"
    />
    <button
        type="button"
        @click="handleFetch"
        :data-aidp-button="aidp"
    >
      Fetch
    </button>
    <div :data-aidp-result="aidp">
      {{ result }}
    </div>
  </div>
</template>

<style scoped>
input {
  margin-right: 0.5rem;
}
</style>