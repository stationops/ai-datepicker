<script setup>
import { ref, watch } from 'vue';
import { fetchDate, tryCatch } from '../core';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
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

const emit = defineEmits(['update:modelValue', 'fetching', 'error', 'selected', 'done']);

const query = ref('');
const result = ref(props.modelValue || '');

watch(() => props.modelValue, (newVal) => {
  result.value = newVal;
});

const handleFetch = async () => {
  emit('fetching');

  const { data, error } = await tryCatch(fetchDate(query.value, props.hint, props.region, props.format));

  if (error) {
    emit('error', error);
  } else {
    result.value = data;
    emit('update:modelValue', data);
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
    <div class="aidp-result">
      {{ result }}
    </div>
  </div>
</template>

<style scoped>
input {
  margin-right: 0.5rem;
}
.aidp-result {
  min-height: 1.5rem;
  margin-top: 0.5rem;
}
</style>
