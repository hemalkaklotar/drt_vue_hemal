<template>
  <div>
    <div v-if="searchable" class="flex gap-4 justify-between items-center py-4">
      <div class="flex w-full rounded-md overflow-hidden bg-gray-900 px-3">
        <MagnifyingGlassIcon class="w-4" />
        <input
          type="text"
          class="w-full py-2 bg-transparent ms-5 text-gray-400 tracking-wider outline-0 focus:outline-0"
          v-model="search"
          placeholder="Search..."
        />
      </div>
      <span
        class="inline-block whitespace-nowrap text-base font-semibold bg-gray-300 text-gray-900 rounded-md py-2 px-3"
      >
        Satellites: {{ rows.length }}</span
      >
    </div>

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto">
        <div class="py-2 align-middle inline-block min-w-full">
          <div class="shadow sm:rounded-lg overflow-hidden select-none">
            <div
              class="h-[75vh] overflow-auto relative"
              v-bind="containerProps"
            >
              <div
                :class="['grid bg-gray-800 sticky top-0 z-10']"
                :style="`grid-template-columns: repeat(${
                  columns.length + 1 || 1
                }, minmax(0, 1fr));`"
              >
                <div
                  class="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer flex items-center gap-3"
                >
                  #
                </div>
                <div
                  v-for="(col, index) in columns"
                  :key="index"
                  :class="[
                    `px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer flex items-center gap-3`,
                    {
                      'bg-gray-600': currentSortKey === col.key,
                    },
                  ]"
                  @click="toggleSort(col.key)"
                >
                  {{ col.label }}
                  <component
                    :is="getSortIcon(col.key)"
                    v-if="currentSortKey === col.key"
                    class="w-3 h-3 text-gray-400"
                  />
                </div>
              </div>
              <div v-if="!rows.length" class="h-12 py-2 px-2 bg-gray-900">
                    No item Found
              </div>
              <div v-else v-bind="wrapperProps" class="relative">
                <div
                  v-for="item in list"
                  :key="item.data.noradCatId"
                  :class="[
                    'grid px-6 py-4 text-sm text-white border-b border-slate-700',
                  ]"
                  :style="`grid-template-columns: repeat(${
                    columns.length + 1 || 1
                  }, minmax(0, 1fr));`"
                >
                  <input
                    type="checkbox"
                    :checked="isSelected(item.data.noradCatId)"
                    :disabled="selectedColumns.length >= 10 && !isSelected(item.data.noradCatId)"
                    @click.stop="toggleColumnSelection(item.data)"
                    class="mr-auto w-10"
                  />
                  <div v-for="col in columns" :key="col.key">
                    {{ item.data[col.key] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { useDebounceFn, useVirtualList } from "@vueuse/core";
import {
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { Column, SortPayload } from "@/utils/types/common";
import { Satellites } from "@/utils/types/services";
import { saveToLocal,loadFromLocal } from "@/utils/globalMethods";

const selectedColumns = ref<Satellites[] | any>([]);
const search = ref("");
const props = defineProps<{
  columns: Column[];
  rows: Satellites[];
  searchable?: boolean;
  sortable?: boolean;
}>();

const emit = defineEmits<{
  (e: "onSearch", val: string): void;
  (e: "onSort", payload: SortPayload): void;
}>();

const debouncedSearch = useDebounceFn((value: string) => {
  emit("onSearch", value);
}, 500);

watch(search, (val) => {
  debouncedSearch(val);
});

const { rows, sortable, searchable } = toRefs(props);
const filteredList = computed(() => rows.value);

const { list, containerProps, wrapperProps } = useVirtualList(filteredList, {
  itemHeight: 55,
});

const currentSortKey = ref<string | null>(null);
const currentSortOrder = ref<"asc" | "desc" | null>(null);

function toggleSort(key: string) {
  if (!sortable.value) return;
  if (currentSortKey.value !== key) {
    currentSortKey.value = key;
    currentSortOrder.value = "asc";
  } else {
    currentSortOrder.value =
      currentSortOrder.value === "asc"
        ? "desc"
        : currentSortOrder.value === "desc"
        ? null
        : "asc";

    if (currentSortOrder.value === null) {
      currentSortKey.value = null;
    }
  }

  emit("onSort", {
    key: currentSortKey.value!,
    order: currentSortOrder.value,
  });
}

function getSortIcon(key: string) {
  if (currentSortKey.value !== key) return null;
  switch (currentSortOrder.value) {
    case "asc":
      return ChevronUpIcon;
    case "desc":
      return ChevronDownIcon;
    default:
      return XMarkIcon;
  }
}
function isSelected(key: string | number ) {
const index = selectedColumns.value?.findIndex(
    (item) => item.noradCatId ===key
  );
  if (index === -1) {
    return false
  } else {
    return true
  }
}
function toggleColumnSelection(obj: Satellites) {
  const index = selectedColumns.value?.findIndex(
    (item) => item.noradCatId === obj.noradCatId
  );
  if (index === -1) {
    selectedColumns.value.push(obj);
  } else {
    selectedColumns.value.splice(index, 1);
  }
 saveToLocal('selectedColumns',selectedColumns.value)
}


</script>

<style scoped></style>
