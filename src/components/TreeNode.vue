<script setup lang="ts">
import type TableRow from "@/models/TableRow.model";
import { toRefs, ref, watchEffect } from "vue";
import TreeView from "./TreeView.vue";

import { useDataStore } from "@/stores/data";

const { deleteNode } = useDataStore();

// props
const props = defineProps<{
  node: TableRow;
  activeIndex: string;
}>();

const { node, activeIndex } = toRefs(props);

//reactive properties
let isOpen = ref<boolean>(false);
let hasChildNode = ref<boolean>(false);

watchEffect(() => {
  hasChildNode.value = !!Object.keys(props.node.kids).length;
});

// methods
const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <tr class="bg-white border-b border-t dark:bg-gray-800 dark:border-gray-700">
    <td class="px-4 py-4">
      <button
        v-if="hasChildNode"
        type="button"
        @click="toggleAccordion"
        :aria-expanded="isOpen"
        :aria-controls="`accordion-${activeIndex}`"
      >
        <font-awesome-icon
          :icon="['fas', isOpen ? 'angle-down' : 'angle-right']"
        />
      </button>
    </td>
    <td
      v-for="(item, i) in Object.values(node.data)"
      :key="i"
      class="px-4 py-4"
    >
      {{ item }}
    </td>
    <td className="w-10 px-4 py-4">
      <button @click="() => deleteNode(activeIndex)">
        <font-awesome-icon :icon="['fas', 'fa-trash']" />
      </button>
    </td>
  </tr>

  <tr v-if="hasChildNode" :id="`accordion-${activeIndex}`" v-show="isOpen">
    <td :colspan="Object.values(node.data).length + 2">
      <template v-if="Object.values(node.kids).length">
        <TreeView
          v-for="(kid, key, index) in node.kids"
          :key="`${key}-${activeIndex}`"
          :data="kid?.records"
          :title="key"
        />
      </template>
    </td>
  </tr>
</template>
