<template>
  <div class="select-item">
    <img class="select-item__icon" :src="image" alt="" />
    <span class="select-item__title">{{ ticker }}</span>
    <span v-if="name" class="select-item__subtitle">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
export interface SearchableSelectItemProps {
  image: string;
  ticker: string;
  name?: string;
}
defineProps<SearchableSelectItemProps>();
</script>

<style lang="scss" scoped>
.select-item {
  display: flex;
  align-items: center;
  gap: 12px;

  &__icon {
    width: 20px;
    height: 20px;
  }

  &__title {
    font-size: 16px;
    line-height: 23px;
    text-transform: uppercase;
  }

  &__subtitle {
    font-size: 16px;
    line-height: 23px;
    color: #80a2b6;
    text-transform: capitalize;
  }
}
</style>
