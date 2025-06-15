<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
  >
    <div class="bg-slate-900 rounded-md border border-slate-700">
      <header class="p-4 border-b border-slate-600 text-xl font-semibold">
        Filters
      </header>
      <section class="p-4 h-96 flex gap-4 relative">
        <div
          v-if="isLoading"
          class="absolute top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm !z-20"
        >
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            />
          </svg>
        </div>
        <slot name="body" :filters="localFilters" />

      </section>
      <footer
        class="flex justify-end gap-3 px-4 py-3 border-t border-slate-600"
      >
        <Button label="Cancel" variant="secondary" @click="onCancel" />
        
        <Button :isLoading="isLoading" label="Apply" @click="onApply" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import Button from "./Button.vue";
const props = defineProps<{
  visible: boolean;
  modelValue: Record<string, any>;
  isLoading:boolean;
}>();

const emit = defineEmits<{
  (e: "update:visible", val: boolean): void;
  (e: "update:modelValue", val: Record<string, any>): void;
  (e: "apply"):  Promise<void>;
}>();

const localFilters = ref({ ...props.modelValue });
watch(
  () => props.modelValue,
  (val) => {
    localFilters.value = { ...val };
  },
  { deep: true }
);

function onCancel() {
  emit("update:visible", false);
}

 function onApply() {
  emit("update:modelValue", { ...localFilters.value });
    emit("apply");
 
}
</script>
