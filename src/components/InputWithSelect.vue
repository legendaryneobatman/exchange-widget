<template>
  <div
    class="input-with-select"
    :class="{
      'input-with-select--open': isOpen,
      'input-with-select--error': isError,
    }"
    v-click-outside="hideDropdown"
  >
    <div v-show="!isOpen" class="input-with-select__form">
      <input
        class="input-with-select__input"
        :value="inputValue"
        :readonly="isReadOnly"
        @input="handleInput($event.target.value)"
      />
      <div class="input-with-select__divider" />
      <searchable-select
        class="input-with-select__select"
        @handle-click="handleSelectOpen"
        :selectedItem="selectValue"
      />
    </div>
    <div v-show="isOpen" class="input-with-select__form">
      <input
        id="search"
        class="input-with-select__input"
        type="text"
        placeholder="Search"
        :value="searchValue"
        @input="handleSearch($event.target.value)"
      />

      <inline-svg
        :src="closeIcon"
        @click="handleClear"
        class="input-with-select__clear"
        width="16"
        height="16"
      />
    </div>

    <div class="input-with-select__dropdown">
      <transition name="slide">
        <div v-show="isOpen" class="input-with-select__options">
          <recycle-scroller
            class="input-with-select__scroller"
            :style="`height: ${calculatedDropdownHeight}px`"
            :items="filteredOptions"
            :item-size="itemSize"
            key-field="name"
            v-slot="{ item }"
          >
            <searchable-select-item
              :key="item.name"
              class="input-with-select__option"
              :image="item.image"
              :ticker="item.ticker"
              :name="item.name"
              @click="handleOptionSelect(item)"
            />
          </recycle-scroller>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from "vue";

import { Currency } from "@/API/dto/response/list-of-available-currencies.reponse";
import closeIcon from "@/assets/icons/close.svg";
import SearchableSelect from "@/components/SearchableSelect.vue";
import SearchableSelectItem from "@/components/SearchableSelectItem.vue";
import { debounce } from "@/utils/debounce";
import { containsOrInclueds } from "@/utils/filterStrings";

export interface InputWithSelectProps {
  options: Currency[];
  selectValue: Currency;
  inputValue: string;
  limit?: number;
  isReadOnly?: boolean;
  isError?: boolean;
}

const props = defineProps<InputWithSelectProps>();
const emits = defineEmits(["onInput", "onSelect"]);

const isOpen = ref(false);
const searchValue = ref("");

const handleSelectOpen = () => (isOpen.value = !isOpen.value);

const itemSize = 48;
const calculatedDropdownHeight = computed(() =>
  filteredOptions.value.length < 3
    ? filteredOptions.value.length * itemSize
    : itemSize * 3
);
const hideDropdown = () => (isOpen.value = false);
const handleOptionSelect = (item: Currency) => {
  if (props.selectValue !== item) {
    emits("onSelect", item);
    hideDropdown();
  }
};
const handleSearch = debounce((value) => (searchValue.value = value), 500);

const filterCurrencyByString = (element: Currency, searchValue: string) => {
  return (
    containsOrInclueds(element.ticker, searchValue) ||
    containsOrInclueds(element.name, searchValue)
  );
};

const filteredOptions = computed((): typeof props.options => {
  return props.options.filter((option) =>
    filterCurrencyByString(option, searchValue.value)
  );
});

const handleInput = debounce((value: string) => {
  emits("onInput", value);
}, 750);
const handleClear = () => {
  searchValue.value = "";
};
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
  width: 100%;
  padding-right: 8px;

  &--open {
    border-radius: 5px 5px 0 0;
  }

  &--error {
    outline: 1px solid #fa3939;
  }

  &__input {
    background: transparent;
    border: none;
    font-size: 16px;
    line-height: 23px;
    padding: 14px 16px;
    width: 100%;

    &:focus-visible {
      outline: none;
    }
  }

  #search::placeholder {
    font-family: "Vollkorn", serif;
    font-size: 16px;
    line-height: 23px;
    color: #80a2b6;
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

  &__form {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &__scroller {
    height: 144px;
    transition: height 0.15s ease-in-out;
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
    transition: all 0.1s ease-in-out;
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

  &__clear {
    cursor: pointer;
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
