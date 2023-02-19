import { defineStore } from "pinia";
import type TableRow from "@/models/TableRow.model";

export const useDataStore = defineStore("data", {
  state: () => ({
    data: [] as TableRow[],
  }),

  getters: {
    getData(state) {
      return state.data;
    },
  },
  actions: {
    async fetchData() {
      try {
        const response = await fetch("/data/data.json");
        const result = await response.json();
        this.data = result;
      } catch (err) {
        this.data = [];
        console.error("Error while loading data:", err);
        return err;
      }
    },
    async deleteNode(index: string) {
      const indexId: string = index.split("_").pop() || "";
      const keyToFind: string = index.split("_").slice(0, -1).join(" ");

      if (keyToFind) {
        const removeNestedObj = (
          entireObj: TableRow[],
          valToFind: string,
          kids: Record<string, { records: TableRow[] }> | null
        ): boolean => {
          let index = entireObj.findIndex(
            (item) => item.data[keyToFind] === valToFind
          );
          if (index > -1) {
            entireObj.splice(index, 1);
            return true;
          }

          for (let element of entireObj) {
            if (element.kids) {
              for (let i = 0; i < Object.keys(element.kids).length; i++) {
                const kids = Object.values(element.kids)[i];

                if (kids && kids.records && kids.records.length) {
                  if (removeNestedObj(kids.records, valToFind, element.kids)) {
                    if (!kids.records.length) {
                      delete element.kids[Object.keys(element.kids)[i]];
                    }
                    if (!Object.keys(element.kids).length) {
                      element.kids = {};
                    }
                    return false;
                  }
                }
              }
            }
          }
          return false;
        };

        removeNestedObj(this.data, indexId, null);
      }
    },
  },
});
