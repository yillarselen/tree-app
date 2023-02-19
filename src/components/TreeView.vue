<script setup lang="ts">
import { toRefs } from "vue";
import type TableRow from "../models/TableRow.model";
import TreeNode from "./TreeNode.vue";

// props
const props = defineProps<{
  data: TableRow[];
  title: string;
}>();
const { data, title } = toRefs(props);

//methods
const getUniqueId = (node: TableRow) => {
  return `${Object.keys(node.data)[0].split(" ").join("_")}_${
    Object.values(node.data)[0]
  }`;
};
</script>

<template>
  <div v-if="data?.length" className="pl-5 pt-5 pb-5">
    <p class="mb-3">{{ title.split("_").join(" ").toUpperCase() }}</p>
    <table
      className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead
        className="text-xs text-gray-700 border-0 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th className="w-10"></th>
          <th
            v-for="(_, key) in data[0].data"
            :key="key"
            scope="col"
            className="px-4 py-4"
          >
            {{ key }}
          </th>
          <th scope="col" className="px-4 py-4"></th>
        </tr>
      </thead>

      <tbody>
        <TreeNode
          v-for="node in data"
          :node="node"
          :key="getUniqueId(node)"
          :activeIndex="getUniqueId(node)"
        />
      </tbody>
    </table>
  </div>
</template>
