<template>
  <div class="flex w-full rounded-md overflow-hidden bg-gray-900 px-3">
    <MagnifyingGlassIcon class="w-4" />
    <input
      type="text"
      class="w-full py-2 bg-transparent ms-5 text-gray-400 tracking-wider outline-0 focus:outline-0"
      v-model="search"
      placeholder="Search..."
    />
  </div>
</template>

<script setup lang="ts">
import { ref,watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

const search = ref('')

const debouncedSearch = useDebounceFn((value: string) => {
  console.log('Searching for:', value)
}, 500)

watch(search, (val) => {
  debouncedSearch(val)
})
</script>
