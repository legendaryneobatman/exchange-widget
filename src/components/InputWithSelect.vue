<template>
  <div
    class="input-with-select"
    :class="{ 'input-with-select--open': isOpen }"
    v-click-outside="hideDropdown"
  >
    <input class="input-with-select__input" type="number" />
    <div class="input-with-select__divider" />
    <searchable-select
      v-show="!isOpen"
      class="input-with-select__select"
      @handle-click="handleSelectOpen"
      :selectedItem="selectedOption"
    />

    <div class="input-with-select__dropdown">
      <transition name="slide">
        <div v-show="isOpen" class="input-with-select__options">
          <searchable-select-item
            v-for="option in options"
            :key="option.name"
            class="input-with-select__option"
            :image="option.image"
            :ticker="option.ticker"
            :name="option.name"
            @click="handleOptionSelect(option)"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchableSelect from "@/components/SearchableSelect.vue";
import { ref, defineProps } from "vue";
import SearchableSelectItem from "@/components/SearchableSelectItem.vue";
import { Currency } from "@/@types/currency";
export interface InputWithSelectProps {
  options: Currency[];
}

const props = defineProps<InputWithSelectProps>();

const isOpen = ref(false);
const selectedOption = ref<Currency | undefined>(props.options[0]);
const handleSelectOpen = () => (isOpen.value = !isOpen.value);
const hideDropdown = () => (isOpen.value = false);
const handleOptionSelect = (item: Currency) => {
  selectedOption.value = item;
  hideDropdown();
};

console.log(selectedOption);
</script>

<style lang="scss" scoped>
.input-with-select {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f6f7f8;
  border: 1px solid #e3ebef;
  border-radius: 5px;
  height: 50px;
  max-width: 440px;

  &--open {
    border-radius: 5px 5px 0 0;
  }

  &__input {
    background: transparent;
    border: none;
    font-size: 16px;
    line-height: 23px;
    padding: 14px 16px;
    max-width: 258px;

    &:focus-visible {
      outline: none;
    }
  }

  &__divider {
    content: "";
    display: block;
    height: 30px;
    width: 1px;
    background: #e3ebef;
    margin-left: 16px;
  }

  &__select {
    margin-left: 16px;
  }

  &__options {
    position: absolute;
    display: block;
    top: 100%;
    left: 0;
    z-index: 1;
    list-style: none;
    margin: 0;
    width: 100%;
    padding: 0;
    border: 1px solid #e3ebef;
    border-radius: 0 0 5px 5px;
    background: #f6f7f8;
    transition: transform 0.2s ease-in-out;
    transform-origin: top;
  }

  &__option {
    display: flex;
    align-items: center;
    height: 48px;
    padding: 12px 16px;
    cursor: pointer;

    &:hover {
      background: #eaf1f7;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transform: scaleY(0);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
