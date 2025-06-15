<template>
  <button
    :class="[buttonClass,'first-letter:uppercase px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center justify-center gap-2',
     { 'cursor-not-allowed opacity-70': isLoading}]"
    :disabled="isLoading"
     @click="handleClick"
  >
    <span>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const emit = defineEmits<{
  (e: 'click'): void;
}>()
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary';
  label:string,
  isLoading?:boolean
}>(), {
  variant: 'primary',
  isLoading:false
})
function handleClick() {
  if (!props.isLoading) {
    emit('click')
  }
}
const buttonClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-violet-800 text-white hover:bg-violet-900'
    case 'secondary':
      return 'bg-gray-700 text-slate-400 hover:bg-gray-800'
    default:
      return 'bg-slate-600 text-white hover:bg-blue-700'
  }
})
</script>

<style scoped>

</style>
