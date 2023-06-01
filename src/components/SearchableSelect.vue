<template>
  <div class="searchable-select">
    <searchable-select-item
      class="searchable-select__select"
      :image="selectedItem.image"
      :ticker="selectedItem.ticker"
    />
    <button class="searchable-select__action" @click="handleClick">
      <inline-svg
        :src="ArrowDown"
        width="16"
        height="16"
        fill="black"
        aria-label="My image"
      ></inline-svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

import { Currency } from "@/@types/currency";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import SearchableSelectItem from "@/components/SearchableSelectItem.vue";

export interface SearchableSelectProps {
  selectedItem: Currency | undefined;
}

defineProps<SearchableSelectProps>();

const emits = defineEmits(["handleClick"]);
const handleClick = () => emits("handleClick");
</script>

<style lang="scss" scoped>
.searchable-select {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 110px;

  &__action {
    border: none;
    border-radius: 0.2rem;
    color: #fff;
    cursor: pointer;
    background: none;
  }
}
</style>
