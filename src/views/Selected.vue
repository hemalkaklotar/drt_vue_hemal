<template>
     <Table 
     :rows="selectedColumns" 
     :columns="satelliteColumns"
    />
</template>

<script setup lang="ts">
import Table from "../components/Table.vue";
import { loadFromLocal } from '@/utils/globalMethods';
import { onMounted, ref } from 'vue';
import { Satellites } from "@/utils/types/services";
import { satelliteColumns } from "@/utils/constant/table";
const selectedColumns = ref<Satellites[]>([])
onMounted(() => {
  const stored = loadFromLocal("selectedColumns");
  console.log(stored)
  try {
    if (stored) {
      selectedColumns.value = stored as Satellites[];
    }
  } catch (e) {
    selectedColumns.value = [];
  }
});
</script>

<style scoped>

</style>
