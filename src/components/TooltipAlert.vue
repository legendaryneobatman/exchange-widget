<template>
  <div class="tooltip">
    <slot />
    <div v-if="isOpen" class="tooltip__content">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
export interface TooltipAlertProps {
  text: string;
  isOpen: boolean;
}
const props = defineProps<TooltipAlertProps>();
</script>

<style lang="scss">
.tooltip {
  position: relative;
  width: 100%;

  &__content {
    position: absolute;
    top: -30px;
    background-color: rgba(244, 10, 10, 0.8);
    color: #fff;
    padding: 4px 8px;
    border-radius: 5px;
    font-size: 14px;
    z-index: 9999;
  }
}
</style>
