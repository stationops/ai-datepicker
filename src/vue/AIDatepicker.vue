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
    default: 'eg: Next Monday'
  },
  hint: {
    type: String,
    required: false
  },
  region: {
    type: String,
    required: false
  },
  format: {
    type: String,
    required: false
  }
});

const emit = defineEmits(['fetching', 'error', 'selected', 'done']);

const query = ref('');
const result = ref('');


const handleFetch = async () => {
  emit('fetching');

  const { data, error } = await tryCatch(fetchDate(query.value, props.hint, props.region, props.format));

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
        class="aidp-date"
        :placeholder="placeholder"
        v-model="query"
        @keydown.enter="handleFetch"
    />
    <button
        class="aidp-button"
        type="button"
        @click="handleFetch"
    >
      ✔
    </button>
    <div
        class="aidp-result">
      {{ result }}
    </div>
  </div>
</template>

<style scoped>
input {
  margin-right: 0.5rem;
}
</style>