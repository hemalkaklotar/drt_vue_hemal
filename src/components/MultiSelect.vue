<template>
  <div class="relative w-full">
    <span class="font-bold block py-1"> {{ label }} </span>
    <div
      class="border border-slate-600 rounded px-3 py-2 bg-slate-800 text-white cursor-pointer md:w-36 lg:w-56"
      @click="isOpen = !isOpen"
    >
      <div class="flex flex-wrap gap-1">
        <span
          v-if="Array.isArray(modelValue) && modelValue.length"
          class="bg-slate-700 px-2 py-1 rounded text-sm"
        >
          {{ modelValue.length }} Items Selected
        </span>
        <span v-else class="text-gray-400">Select options</span>
      </div>
    </div>

    <div
      v-if="isOpen"
      class="absolute mt-1 w-full bg-slate-800 border border-slate-600 rounded max-h-60 overflow-y-auto z-10"
    >
      <div
        v-for="option in options"
        :key="option.key"
        class="px-3  hover:bg-slate-700 cursor-pointer text-white flex items-center gap-2"
      >
        <label class="inline-flex w-full py-2 items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            :checked="modelValue?.includes(option.key)"
            @change="toggle(option.key)"
            class="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
          />
          <span class="text-gray-200">{{ option.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  options: {
    key: string;
    label: string;
  }[];
  label: string;
}>();

const modelValue = defineModel<string[]>({ required: true });
const isOpen = ref(false);

function toggle(option: string) {
  const exists = modelValue.value?.includes(option);
  if (exists) {
    modelValue.value = modelValue.value?.filter((o) => o !== option);
  } else {
    modelValue.value = [...modelValue.value, option];
  }
}
</script>
