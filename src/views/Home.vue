<template>
  <Loader v-if="loading.globalLoader" />
  <div v-else class="h-full overflow-hidden">
    <div 
      class="flex justify-between items-center bg-slate-900 py-2 px-4 rounded-md"
    >
      <h3 class="text-2xl font-bold uppercase">Satellites</h3>
      <div>
        <Button label="Filters" @click="isModel = true" />
      </div>
    </div>
    <Table :rows="satellites" :columns="columnList"
    searchable
    sortable
    @onSearch="handleGlobalSearch"
    @onSort="handleSort"
    >
      <template #noradCatId="{ row }">
        <span>
          {{ row }}
        </span>
      </template>
    </Table>
    <FilterModel 
    :isLoading="loading.filterLoader"
    v-model:visible="isModel" v-model:modelValue="tableState.filters"
     @apply="onFiltersApplied"
    >
      <template #body="{ filters }">
        <MultiSelect
          v-model="filters.attributes"
          label="Selected Column"
          :options="satelliteColumns"
        />
        <MultiSelect
          v-model="filters.orbitCodes"
          label="Orbit Codes"
          :options="orbitCodes"
        />
        <MultiSelect
          v-model="filters.orbitTypes"
          label="Orbit Types"
          :options="orbitTypes"
        />
      </template>
    </FilterModel>
  </div>
</template>

<script setup lang="ts">
import {  onMounted, ref, } from "vue";
import { getSatellites } from "@/services/satellites";
import { Satellites } from "@/utils/types/services";
import { satelliteColumns,orbitTypes,orbitCodes } from "@/utils/constant/table";
import { saveToLocal,loadFromLocal } from "@/utils/globalMethods";

import Table from "../components/Table.vue";
import Button from "../components/Button.vue";
import FilterModel from "@/components/FilterModel.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import Loader from "@/components/Loader.vue";
import { Column, SortPayload } from "@/utils/types/common";
const tableState  = ref({
  filters:{
    orbitTypes: [],
    orbitCodes: [],
    attributes:[],
  },
  search:'',
  sortBy: '',
  sortOrder: 'asc',
});
const loading =ref({
  filterLoader:false,
  globalLoader:false
})
const satellites = ref<Satellites[]>([]);
const isModel = ref<boolean>(false);
const columnList = ref<Column[]>([])
let allSatellitesRaw: Satellites[] = [];
const savedFilters = loadFromLocal('filters');
if (savedFilters) {
  tableState.value.filters = { ...tableState.value.filters , ...savedFilters };
}

const handleGlobalSearch = (val:string) =>{
  saveToLocal('filters',tableState.value.search)

   const query = val.trim().toLowerCase();
    if (!query) {
    satellites.value = allSatellitesRaw;
    return;
  }

  satellites.value = allSatellitesRaw.filter(item =>
    item.name?.toLowerCase().includes(query) ||
    item.noradCatId?.toString().includes(query)
  );
}


const handleSort = (payload:SortPayload) =>{
   if (payload && payload.key) {
    const { key, order } = payload;
    if (!order) {
  satellites.value = [...allSatellitesRaw];
  return;
}
    satellites.value = [...satellites.value].sort((a: any, b: any) => {
      const valA = a[key];
      const valB = b[key];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === 'string') {
        return order === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return order === 'asc' ? valA - valB : valB - valA;
    });
  }
  
}
const onFiltersApplied = () =>{
  loading.value.filterLoader = true
  saveToLocal('filters',tableState.value.filters)
  fetchSatellites(tableState.value.filters);
}

const fetchSatellites =(filters={}) =>{
  getSatellites(filters).then((res) => {
    satellites.value = res;
    allSatellitesRaw = res;
    isModel.value = false;
    loading.value.filterLoader = false;
    loading.value.globalLoader = false
    const allKeys = Object.keys(res[0] || {});
   columnList.value = satelliteColumns.filter(col => allKeys.includes(col.key));
  });
}
onMounted(() => {
  loading.value.globalLoader = true
  fetchSatellites(tableState.value.filters)
});

</script>

<style scoped></style>
