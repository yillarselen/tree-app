<script setup lang="ts">
import TreeView from "./components/TreeView.vue";
import { storeToRefs } from "pinia";

// store
import { useDataStore } from "@/stores/data";
import { onMounted } from "vue";
const { fetchData } = useDataStore();

const { data } = storeToRefs(useDataStore());

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="pr-5">
    <TreeView :data="data" title="DATA JSON" />
  </div>
</template>
