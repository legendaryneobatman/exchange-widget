<template>
  <button class="text-button" :class="{ 'text-button--disabled': isDisabled }">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
export interface TextButtonProps {
  isDisabled: boolean;
}
const props = withDefaults(defineProps<TextButtonProps>(), {
  isDisabled: false,
});
</script>

<style lang="scss" scoped>
.text-button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: white;
  background: #0095e0;
  border: none;
  border-radius: 5px;
  padding: 15px;
  max-width: 208px;
  width: 100%;
  height: 100%;

  &:hover {
    background: #017bb9;
  }

  &--disabled {
    background: #11b3fe;

    &:hover {
      background: #11b3fe;
    }
  }
}
</style>
